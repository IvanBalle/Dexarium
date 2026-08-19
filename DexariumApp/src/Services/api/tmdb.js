const TMDB_API_URL = "https://api.themoviedb.org/3"
import { normalizeMovie } from "../../normalizers/movieNormalizer.js"
import { normalizeTvShow } from "../../normalizers/tvshowNormalizer.js"

const tmdbFetch = async (path, params = {}) => {
    const url = new URL(`${TMDB_API_URL}${path}`)
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value))
    const response = await fetch(url, {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}` },
    })
    if (!response.ok) throw new Error(`TMDB API error: ${response.status} ${response.statusText}`)
    return response.json()
}

export async function getPopularMovies(page = 1) {
    const data = await tmdbFetch("/movie/popular", { page })
    return data.results.map(normalizeMovie)
}

async function fetchTvShowsPage(page = 1) {
    return tmdbFetch("/discover/tv", {
        include_adult: "false",
        include_null_first_air_dates: "false",
        sort_by: "popularity.desc",
        "vote_count.gte": "1000",
        "vote_average.gte": "7",
        without_genres: "10763,10764,10767",
        page,
    })
}

function filterTvShows(shows) {
    return shows.filter((show) => {
        const isAnimation = show.genre_ids?.includes(16)
        const isJapanese = show.origin_country?.includes("JP") || show.original_language === "ja"
        return !(isAnimation && isJapanese)
    })
}

export async function getPopularTvShows(page = 1) {
    const data = await fetchTvShowsPage(page)
    return filterTvShows(data.results).map(normalizeTvShow)
}

export async function getMovieDetails(id) {
    const data = await tmdbFetch(`/movie/${id}`, { append_to_response: "credits" })
    return normalizeMovie(data)
}

export async function getTvShowDetails(id) {
    const data = await tmdbFetch(`/tv/${id}`)
    return normalizeTvShow(data)
}
