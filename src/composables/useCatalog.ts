import { continents, destinations } from "@/content";
import type { CatalogControls, Continent, FavoriteControls } from "@/types";

export const focusCatalogFallback = (origin: HTMLElement | null): void => {
  const cards = [...document.querySelectorAll<HTMLElement>("[data-destination-card]")];
  const originCard = origin?.closest<HTMLElement>("[data-destination-card]");
  const originIndex = originCard ? cards.indexOf(originCard) : -1;
  const orderedCards = [...cards.slice(originIndex + 1), ...cards.slice(0, originIndex + 1)];
  const nextCard = orderedCards.find((card) => !card.hidden && card.getClientRects().length > 0);
  const nextTarget = nextCard?.querySelector<HTMLButtonElement>("[data-favorite]") ??
    document.querySelector<HTMLButtonElement>('[data-continent-filter][aria-pressed="true"]');
  nextTarget?.focus();
};

export const useCatalog = (favorites: FavoriteControls): CatalogControls => {
  // State and elements
  let activeContinent: Continent = "Todos";
  let favoritesOnly = false;
  const cards = [...document.querySelectorAll<HTMLElement>("[data-destination-card]")];
  const continentButtons = [...document.querySelectorAll<HTMLButtonElement>("[data-continent-filter]")];
  const favoriteFilter = document.querySelector<HTMLButtonElement>("[data-favorites-filter]");
  const status = document.querySelector<HTMLElement>("[data-catalog-status]");
  const emptyState = document.querySelector<HTMLElement>("[data-empty-state]");

  // Rendering
  const render = (): void => {
    const focusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusedCard = focusedElement?.closest<HTMLElement>("[data-destination-card]");
    let visibleCount = 0;
    cards.forEach((card) => {
      const visible = (activeContinent === "Todos" || card.dataset.continent === activeContinent) &&
        (!favoritesOnly || favorites.selection.has(card.dataset.id ?? ""));
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    continentButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.continentFilter === activeContinent)));
    favoriteFilter?.setAttribute("aria-pressed", String(favoritesOnly));
    if (status) status.textContent = `${visibleCount} ${visibleCount === 1 ? "lugar" : "lugares"} ${favoritesOnly ? "en tu mapa" : "para descubrir"}${activeContinent === "Todos" ? "" : ` · ${activeContinent}`}`;
    if (emptyState) emptyState.hidden = visibleCount > 0;
    document.querySelectorAll<HTMLElement>("[data-favorite-count]").forEach((count) => { count.textContent = String(favorites.selection.getIds().length); });
    const savedCount = favorites.selection.getIds().length;
    document.querySelector("[data-open-favorites]")?.setAttribute("aria-label", `Tu mapa, ${savedCount} ${savedCount === 1 ? "lugar guardado" : "lugares guardados"}`);
    document.querySelectorAll<HTMLButtonElement>("[data-favorite]").forEach((button) => {
      const id = button.dataset.favorite ?? "";
      const selected = favorites.selection.has(id);
      const name = destinations.find((destination) => destination.id === id)?.name ?? "este lugar";
      button.setAttribute("aria-pressed", String(selected));
      button.setAttribute("aria-label", `${selected ? "Quitar" : "Guardar"} ${name} ${selected ? "de" : "en"} tu mapa`);
    });
    if (focusedCard?.hidden) focusCatalogFallback(focusedElement);
  };
  const setContinent = (continent: Continent): void => { if (continents.includes(continent)) { activeContinent = continent; render(); } };
  const setFavoritesOnly = (value: boolean): void => { favoritesOnly = value; render(); };

  // Event bindings
  continentButtons.forEach((button) => button.addEventListener("click", () => setContinent(button.dataset.continentFilter as Continent)));
  favoriteFilter?.addEventListener("click", () => setFavoritesOnly(!favoritesOnly));
  document.querySelectorAll<HTMLButtonElement>("[data-favorite]").forEach((button) => button.addEventListener("click", () => favorites.actions.toggle(button.dataset.favorite ?? "")));
  const unsubscribe = favorites.actions.subscribe(render);
  render();

  return { filters: { setContinent, setFavoritesOnly }, lifecycle: { render, dispose: unsubscribe } };
};
