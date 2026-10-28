import { parseFavorites } from "@/composables/favoriteStorage";
import type { FavoriteControls } from "@/types";

export const useFavorites = (validIds: readonly string[]): FavoriteControls => {
  // State
  const storageKey = "hito-mapa-v1";
  let ids: string[] = [];
  try { ids = parseFavorites(localStorage.getItem(storageKey), validIds); } catch { /* In-memory favorites remain available. */ }
  const listeners = new Set<() => void>();

  // Actions
  const toggle = (id: string): void => {
    if (!validIds.includes(id)) return;
    ids = ids.includes(id) ? ids.filter((entry) => entry !== id) : [...ids, id];
    try { localStorage.setItem(storageKey, JSON.stringify(ids)); } catch { /* Favorites remain usable in this session. */ }
    listeners.forEach((listener) => listener());
  };
  const subscribe = (callback: () => void): (() => void) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
  };

  return {
    selection: { getIds: () => [...ids], has: (id) => ids.includes(id) },
    actions: { toggle, subscribe },
  };
};
