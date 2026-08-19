const JIKAN_API_URL = "https://api.jikan.moe/v4/top/anime"
import { normalizeAnime } from "../../normalizers/animeNormalizer.js"
export async function getAnime(page = 1) {
    console.log("Requested page:", page)

    const response = await fetch(`${JIKAN_API_URL}?page=${page}`)

    if (!response.ok) {
        throw new Error(`Jikan API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    return data.data.map((anime) => normalizeAnime(anime))
}
