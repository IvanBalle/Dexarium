const JIKAN_API_URL = "https://api.jikan.moe/v4"
import { normalizeAnime } from "../../normalizers/animeNormalizer.js"

async function jikanFetch(path) {
    const response = await fetch(`${JIKAN_API_URL}${path}`)
    if (!response.ok) throw new Error(`Jikan API error: ${response.status} ${response.statusText}`)
    return response.json()
}

export async function getAnime(page = 1) {
    const data = await jikanFetch(`/top/anime?page=${page}`)
    return data.data.map(normalizeAnime)
}

export async function getAnimeDetails(id) {
    const data = await jikanFetch(`/anime/${id}/full`)
    return normalizeAnime(data.data)
}
