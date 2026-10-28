export type Continent = "Todos" | "Asia" | "América" | "Europa" | "África";
export interface Destination {
  id: string;
  name: string;
  country: string;
  continent: Exclude<Continent, "Todos">;
  coordinates: string;
  category: string;
  phrase: string;
  description: string;
  days: number;
  season: string;
  imageAlt: string;
  imagePosition: string;
  route: { name: string; description: string }[];
}

export interface FavoriteControls {
  selection: { getIds: () => string[]; has: (id: string) => boolean };
  actions: { toggle: (id: string) => void; subscribe: (callback: () => void) => () => void };
}

export interface CatalogControls {
  filters: { setContinent: (continent: Continent) => void; setFavoritesOnly: (value: boolean) => void };
  lifecycle: { render: () => void; dispose: () => void };
}
