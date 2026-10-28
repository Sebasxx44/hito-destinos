import { destinations } from "@/content";
import { useFavorites } from "@/composables/useFavorites";
import { useCatalog } from "@/composables/useCatalog";
import { useHero } from "@/composables/useHero";
import { useRouteDialog } from "@/composables/useRouteDialog";

export const initializeHito = (): void => {
  const favorites = useFavorites(destinations.map(({ id }) => id));
  const catalog = useCatalog(favorites);
  useHero();
  useRouteDialog(favorites);

  // Catalog entry points
  const scrollToCatalog = (): void => document.querySelector("#lugares")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  document.querySelector("[data-open-favorites]")?.addEventListener("click", () => { catalog.filters.setContinent("Todos"); catalog.filters.setFavoritesOnly(true); scrollToCatalog(); });
  document.querySelector("[data-reset-filters]")?.addEventListener("click", () => { catalog.filters.setContinent("Todos"); catalog.filters.setFavoritesOnly(false); });

  // Mobile navigation
  const menuToggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  const mobileNav = document.querySelector<HTMLElement>("[data-mobile-nav]");
  const setMenu = (open: boolean): void => {
    if (mobileNav) mobileNav.hidden = !open;
    menuToggle?.setAttribute("aria-expanded", String(open));
    menuToggle?.setAttribute("aria-label", open ? "Cerrar navegación" : "Abrir navegación");
  };
  menuToggle?.addEventListener("click", () => setMenu(menuToggle.getAttribute("aria-expanded") !== "true"));
  mobileNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      menuToggle.focus();
    }
  });
};
