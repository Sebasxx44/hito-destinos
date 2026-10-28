export const parseFavorites = (raw: string | null, validIds: readonly string[]): string[] => {
  try {
    const value = JSON.parse(raw ?? "[]") as string[];
    if (!Array.isArray(value)) return [];
    return [...new Set(value.filter((id) => typeof id === "string" && validIds.includes(id)))];
  } catch { return []; }
};
