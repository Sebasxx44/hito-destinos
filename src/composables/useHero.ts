import { heroDestinations, imageSrcset } from "@/content";

export const useHero = (): void => {
  // Elements and state
  const image = document.querySelector<HTMLImageElement>("[data-hero-image]");
  if (!image) return;
  const title = document.querySelector<HTMLElement>("[data-hero-title]");
  const mobileSource = document.querySelector<HTMLSourceElement>("[data-hero-mobile-source]");
  const thumbnails = [...document.querySelectorAll<HTMLButtonElement>("[data-hero-select]")];
  let currentIndex = 0;
  let pendingIndex = 0;
  let requestId = 0;

  // Manual navigation: full-resolution images load only when requested.
  const select = async (index: number): Promise<void> => {
    const nextIndex = (index + heroDestinations.length) % heroDestinations.length;
    pendingIndex = nextIndex;
    if (nextIndex === currentIndex) { requestId += 1; return; }
    const request = ++requestId;
    const destination = heroDestinations[nextIndex];
    const preview = new Image();
    preview.sizes = "100vw";
    const mobileSrcset = `/images/${destination.id}-mobile-600.webp 600w, /images/${destination.id}-mobile-900.webp 900w`;
    preview.srcset = window.matchMedia("(max-width:600px)").matches ? mobileSrcset : imageSrcset(destination.id);
    preview.src = `/images/${destination.id}-1920.webp`;
    try { await preview.decode(); } catch { return; }
    if (request !== requestId) return;
    currentIndex = nextIndex;
    if (mobileSource) mobileSource.srcset = mobileSrcset;
    image.srcset = imageSrcset(destination.id);
    image.src = preview.src;
    image.alt = destination.imageAlt;
    image.style.objectPosition = destination.imagePosition;
    if (title) { title.textContent = destination.name.toLocaleUpperCase("es"); title.dataset.length = destination.name.length > 7 ? "long" : "short"; }
    const textFields: Record<string, string> = {
      "[data-hero-category]": destination.category,
      "[data-hero-phrase]": destination.phrase,
      "[data-hero-country]": destination.country.toLocaleUpperCase("es"),
      "[data-hero-coordinates]": destination.coordinates,
      "[data-hero-count]": String(nextIndex + 1).padStart(2, "0"),
      "[data-hero-status]": `Lugar destacado: ${destination.name}, ${destination.country}. ${nextIndex + 1} de ${heroDestinations.length}.`,
    };
    Object.entries(textFields).forEach(([selector, text]) => { const field = document.querySelector(selector); if (field) field.textContent = text; });
    const routeButton = document.querySelector<HTMLButtonElement>("[data-hero-route]");
    if (routeButton) routeButton.dataset.route = destination.id;
    thumbnails.forEach((button, buttonIndex) => { const selected = buttonIndex === nextIndex; button.classList.toggle("is-active", selected); button.setAttribute("aria-pressed", String(selected)); });
  };

  // Events
  thumbnails.forEach((button) => button.addEventListener("click", () => { void select(Number(button.dataset.heroSelect)); }));
  document.querySelector("[data-hero-prev]")?.addEventListener("click", () => { void select(pendingIndex - 1); });
  document.querySelector("[data-hero-next]")?.addEventListener("click", () => { void select(pendingIndex + 1); });
  document.querySelector(".hero-index")?.addEventListener("keydown", (event) => {
    if (!(event instanceof KeyboardEvent) || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault(); void select(pendingIndex + (event.key === "ArrowRight" ? 1 : -1));
  });
};
