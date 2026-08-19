const RAWG_API_BASE = `https://api.rawg.io/api/games`
const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_TOKEN

import { normalizeGame, normalizeGameDetails } from "../../normalizers/gameNormalizer.js"

export async function getPopularGames(page = 1) {
    const url = `${RAWG_API_BASE}?key=${RAWG_API_KEY}&page=${page}`
    const response = await fetch(url)
    if (!response.ok) throw new Error(`RAWG API error: ${response.status} ${response.statusText}`)
    const data = await response.json()
    return data.results.map(normalizeGame)
}

export async function getGameDetails(id) {
    const url = `${RAWG_API_BASE}/${encodeURIComponent(id)}?key=${RAWG_API_KEY}`
    const response = await fetch(url)
    if (!response.ok) throw new Error(`RAWG API error: ${response.status} ${response.statusText}`)
    const data = await response.json()
    return normalizeGameDetails(data)
}
