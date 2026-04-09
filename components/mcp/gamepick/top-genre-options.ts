/**
 * Labels for GameBrain genre filter slugs (must match server allowlist in
 * utils/mcp/apps/gamepick/top-rated.ts).
 */
export const TOP_GENRE_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'All genres' },
  { value: 'action', label: 'Action' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'rpg', label: 'RPG' },
  { value: 'strategy', label: 'Strategy' },
  { value: 'simulation', label: 'Simulation' },
  { value: 'puzzle', label: 'Puzzle' },
  { value: 'shooter', label: 'Shooter' },
  { value: 'sports', label: 'Sports' },
  { value: 'racing', label: 'Racing' },
  { value: 'horror', label: 'Horror' },
  { value: 'platformer', label: 'Platformer' },
  { value: 'fighting', label: 'Fighting' },
  { value: 'indie', label: 'Indie' },
]

/**
 * JSON for GameBrain `filters` query param (genre key).
 */
export function buildGenreFiltersParam(slug: string): string | undefined {
  const s = slug.trim().toLowerCase()
  if (!s) {
    return undefined
  }
  const allowed = TOP_GENRE_OPTIONS.some((o) => o.value === s)
  if (!allowed) {
    return undefined
  }
  return JSON.stringify([{ key: 'genre', values: [{ value: s }] }])
}
