import { destinations, imageSrcset } from "@/content";
import { focusCatalogFallback } from "@/composables/useCatalog";
import type { FavoriteControls } from "@/types";

export const useRouteDialog = (favorites: FavoriteControls): void => {
  // Elements and state
  const dialog = document.querySelector<HTMLDialogElement>("[data-route-dialog]");
  if (!dialog) return;
  let selectedId = destinations[0].id;
  let priorOverflow = "";
  let opener: HTMLElement | null = null;
  const favoriteButton = dialog.querySelector<HTMLButtonElement>("[data-dialog-favorite]");
  const status = dialog.querySelector<HTMLElement>("[data-dialog-status]");
  const updateFavorite = (): void => {
    if (!favoriteButton) return;
    const selected = favorites.selection.has(selectedId);
    favoriteButton.setAttribute("aria-pressed", String(selected));
    const text = favoriteButton.firstChild;
    if (text) text.textContent = selected ? "Quitar de mi mapa " : "Guardar en mi mapa ";
  };

  // Opening and closing
  const open = (id: string): void => {
    const destination = destinations.find((entry) => entry.id === id);
    if (!destination) return;
    selectedId = id;
    const textFields: Record<string, string> = {
      "[data-dialog-title]": destination.name,
      "[data-dialog-location]": `${destination.country} / ${destination.continent}`,
      "[data-dialog-description]": destination.description,
      "[data-dialog-days]": `${destination.days} días como idea inicial`,
      "[data-dialog-season]": destination.season,
    };
    Object.entries(textFields).forEach(([selector, text]) => { const field = dialog.querySelector(selector); if (field) field.textContent = text; });
    const image = dialog.querySelector<HTMLImageElement>("[data-dialog-image]");
    if (image) { image.srcset = imageSrcset(id); image.sizes = "(max-width:760px) 100vw, 45vw"; image.src = `/images/${id}-960.webp`; image.alt = destination.imageAlt; image.style.objectPosition = destination.imagePosition; }
    const stops = dialog.querySelector<HTMLOListElement>("[data-dialog-stops]");
    stops?.replaceChildren(...destination.route.map((stop, index) => {
      const item = document.createElement("li");
      const number = document.createElement("span"); number.textContent = String(index + 1).padStart(2, "0");
      const copy = document.createElement("div");
      const heading = document.createElement("h4"); heading.textContent = stop.name;
      const description = document.createElement("p"); description.textContent = stop.description;
      copy.append(heading, description); item.append(number, copy); return item;
    }));
    if (status) status.textContent = "";
    updateFavorite();
    opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    priorOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();
  };
  const close = (): void => {
    dialog.close();
    document.body.style.overflow = priorOverflow;
    if (opener && opener.getClientRects().length > 0 && !opener.closest("[hidden]")) opener.focus();
    else focusCatalogFallback(opener);
  };

  // Events
  document.querySelectorAll<HTMLButtonElement>("[data-route]").forEach((button) => button.addEventListener("click", () => open(button.dataset.route ?? "")));
  dialog.querySelector("[data-close-dialog]")?.addEventListener("click", close);
  dialog.addEventListener("cancel", (event) => { event.preventDefault(); close(); });
  dialog.addEventListener("click", (event) => { if (event.target === dialog) close(); });
  favoriteButton?.addEventListener("click", () => {
    favorites.actions.toggle(selectedId);
    if (status) status.textContent = favorites.selection.has(selectedId) ? "Lugar guardado en tu mapa." : "Lugar eliminado de tu mapa.";
  });
  favorites.actions.subscribe(updateFavorite);
  dialog.querySelector("[data-download-route]")?.addEventListener("click", () => {
    const destination = destinations.find((entry) => entry.id === selectedId);
    if (!destination) return;
    const content = [`HITO — ${destination.name.toLocaleUpperCase("es")}`, `${destination.country} / ${destination.continent}`, destination.description, "", "UNA RUTA POSIBLE", ...destination.route.map((stop, index) => `${index + 1}. ${stop.name}\n${stop.description}\n`), "Proyecto conceptual. Ruta ilustrativa, sin reservas, precios ni disponibilidad. Consulta información oficial antes de viajar."].join("\n");
    const url = URL.createObjectURL(new Blob([content], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = `hito-${selectedId}.txt`; link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    if (status) status.textContent = "Tu idea de ruta se ha descargado.";
  });
};
