import type { McpAppConfig, McpToolDefinition } from '@/utils/mcp/core/registry'
import {
  pickCatalogConfigured,
  pickCatalogGameDetail,
  pickCatalogSearchGames,
} from '@/utils/mcp/apps/gamepick/catalog-api'
import {
  normalizeGameDetail,
  normalizeSearchHit,
} from '@/utils/mcp/apps/gamepick/normalize'
import {
  clampTopRatedOffset,
  isAllowedTopGenreSlug,
  pickTopRatedGames,
} from '@/utils/mcp/apps/gamepick/top-rated'

const findGameTool: McpToolDefinition = {
  name: 'find_game',
  title: 'Find Game',
  description:
    'GamePick: search video games by title or open a game by catalog id. Use query for natural-language search; use game_id when you already know the id.',
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description:
          'Search text (game name, genre, style, e.g. medieval strategy).',
      },
      game_id: {
        type: 'number',
        description:
          'Catalog game id to open details directly (from a prior result).',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    openWorldHint: true,
    idempotentHint: false,
  },
}

const browseTopGamesTool: McpToolDefinition = {
  name: 'browse_top_games',
  title: 'Browse Top-Rated Games',
  description:
    'GamePick: list highly rated games from the catalog (score order, best first). Optional genre filter. Use offset 10, 20, … for the next page when the user wants more.',
  inputSchema: {
    type: 'object',
    properties: {
      genre: {
        type: 'string',
        description:
          'Optional genre slug: action, adventure, rpg, strategy, simulation, puzzle, shooter, sports, racing, horror, platformer, fighting, indie. Omit for all genres.',
      },
      offset: {
        type: 'number',
        description: 'Pagination offset (0, 10, 20, … up to 1000). Default 0.',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    openWorldHint: true,
    idempotentHint: true,
  },
}

export const gamepickTools: McpToolDefinition[] = [
  findGameTool,
  browseTopGamesTool,
]

export type ToolHandler = (
  app: McpAppConfig,
  args: Record<string, unknown>,
  userId: string,
) => Promise<Record<string, unknown>>

function str(args: Record<string, unknown>, ...keys: string[]): string {
  for (const k of keys) {
    const v = args[k]
    if (v !== undefined && v !== null && String(v).trim() !== '') {
      return String(v).trim()
    }
  }
  return ''
}

function parseGameId(args: Record<string, unknown>): number | undefined {
  const v = args.game_id ?? args.gameId
  if (typeof v === 'number' && Number.isFinite(v) && v > 0) {
    return Math.floor(v)
  }
  if (typeof v === 'string' && /^\d+$/.test(v.trim())) {
    return parseInt(v.trim(), 10)
  }
  return undefined
}

function resultsPayloadFromCatalogData(
  data: Record<string, unknown>,
  queryLabel: string,
  message: string,
): Record<string, unknown> | null {
  const rawResults = Array.isArray(data.results) ? data.results : []
  const totalResults =
    typeof data.total_results === 'number' && data.total_results >= 0
      ? data.total_results
      : rawResults.length

  const hits: Record<string, unknown>[] = []
  for (const el of rawResults) {
    if (el && typeof el === 'object') {
      hits.push(normalizeSearchHit(el as Record<string, unknown>))
    }
  }

  if (hits.length === 0) {
    return null
  }

  const limit = typeof data.limit === 'number' ? data.limit : 10
  const totalPages = Math.max(1, Math.ceil(totalResults / Math.max(1, limit)))

  return {
    success: true,
    mode: 'results' as const,
    query: queryLabel,
    results: hits,
    total_results: totalResults,
    total_pages: totalPages,
    message,
  }
}

function detailPayloadFromRaw(
  raw: Record<string, unknown>,
): Record<string, unknown> {
  const game = normalizeGameDetail(raw)
  const title = typeof game.title === 'string' ? game.title : 'Game'
  const year = typeof game.year === 'number' ? game.year : 0
  const rm = typeof game.rating_mean === 'number' ? game.rating_mean : 0
  const score =
    rm > 0 && rm <= 1
      ? `${Math.round(rm * 100)}% player score`
      : rm > 1
      ? `${rm.toFixed(1)}/10`
      : ''
  const msg = [title, year > 0 ? `(${year})` : '', score]
    .filter(Boolean)
    .join(' ')
  return {
    success: true,
    mode: 'detail' as const,
    game,
    message: msg || title,
  }
}

async function handleFindGame(
  _app: McpAppConfig,
  args: Record<string, unknown>,
  _userId: string,
): Promise<Record<string, unknown>> {
  void _userId
  if (!pickCatalogConfigured()) {
    return {
      success: false,
      mode: 'search',
      message:
        'GamePick is not configured on the server (missing catalog API key).',
    }
  }

  const gameId = parseGameId(args)
  if (gameId != null) {
    const res = await pickCatalogGameDetail(gameId)
    if (!res.ok) {
      return {
        success: false,
        mode: 'search',
        message: `No game found for id ${gameId}.`,
        query: '',
      }
    }
    if (!res.data || typeof res.data !== 'object') {
      return {
        success: false,
        mode: 'search',
        message: `Could not load game ${gameId}.`,
        query: '',
      }
    }
    return detailPayloadFromRaw(res.data as Record<string, unknown>)
  }

  const query = str(args, 'query')
  if (!query) {
    return {
      success: true,
      mode: 'search',
      message: 'Open GamePick to search games or suggest a title to search.',
      query: '',
    }
  }

  const search = await pickCatalogSearchGames({
    query,
    offset: 0,
    limit: 10,
  })

  if (!search.ok) {
    return {
      success: false,
      mode: 'search',
      message: 'GamePick search failed. Try again or narrow your query.',
      query,
    }
  }

  const data = search.data as Record<string, unknown>
  const rawResults = Array.isArray(data.results) ? data.results : []
  const totalResults =
    typeof data.total_results === 'number' && data.total_results >= 0
      ? data.total_results
      : rawResults.length

  const hits: Record<string, unknown>[] = []
  for (const el of rawResults) {
    if (el && typeof el === 'object') {
      hits.push(normalizeSearchHit(el as Record<string, unknown>))
    }
  }

  if (hits.length === 0) {
    return {
      success: false,
      mode: 'search',
      message: `No games found for "${query}".`,
      query,
    }
  }

  if (hits.length === 1) {
    const onlyId = hits[0]?.id
    const idNum =
      typeof onlyId === 'string' && /^\d+$/.test(onlyId)
        ? parseInt(onlyId, 10)
        : 0
    if (idNum > 0) {
      const det = await pickCatalogGameDetail(idNum)
      if (det.ok && det.data && typeof det.data === 'object') {
        return {
          ...detailPayloadFromRaw(det.data as Record<string, unknown>),
          query,
        }
      }
    }
  }

  const top = hits[0]
  const topTitle =
    top && typeof top.title === 'string' ? top.title : 'Top match'
  const topYear = top && typeof top.year === 'string' ? top.year : ''
  const msg = `Found ${totalResults} game(s) for "${query}". Top match: "${topTitle}"${
    topYear ? ` (${topYear})` : ''
  }. Open the widget to browse.`

  const payload = resultsPayloadFromCatalogData(data, query, msg)
  if (!payload) {
    return {
      success: false,
      mode: 'search',
      message: `No games found for "${query}".`,
      query,
    }
  }
  return payload
}

async function handleBrowseTopGames(
  _app: McpAppConfig,
  args: Record<string, unknown>,
  _userId: string,
): Promise<Record<string, unknown>> {
  void _userId
  if (!pickCatalogConfigured()) {
    return {
      success: false,
      mode: 'search',
      message:
        'GamePick is not configured on the server (missing catalog API key).',
    }
  }

  const genreRaw = str(args, 'genre')
  const genreSlug =
    genreRaw && isAllowedTopGenreSlug(genreRaw) ? genreRaw.toLowerCase() : ''
  const offset = clampTopRatedOffset(args.offset ?? args.page_offset)

  const search = await pickTopRatedGames({
    genreSlug: genreSlug || undefined,
    offset,
  })

  if (!search.ok) {
    return {
      success: false,
      mode: 'search',
      message: 'GamePick could not load top-rated games. Try again.',
      query: '',
    }
  }

  const data = search.data as Record<string, unknown>
  const label =
    genreSlug.length > 0 ? `Top rated — ${genreSlug}` : 'Top rated — all genres'
  const rawResults = Array.isArray(data.results) ? data.results : []
  const topName =
    rawResults[0] && typeof rawResults[0] === 'object'
      ? String((rawResults[0] as Record<string, unknown>).name ?? '')
      : ''

  const msg = `Highly rated games (${label}, offset ${offset}).${
    topName ? ` First in page: "${topName}".` : ''
  } Open the widget to browse.`

  const payload = resultsPayloadFromCatalogData(data, label, msg)
  if (!payload) {
    return {
      success: false,
      mode: 'search',
      message: `No top-rated games for this filter (offset ${offset}).`,
      query: label,
    }
  }
  return payload
}

export function getGamepickToolHandlers(): Record<string, ToolHandler> {
  return {
    find_game: handleFindGame as ToolHandler,
    browse_top_games: handleBrowseTopGames as ToolHandler,
  }
}
