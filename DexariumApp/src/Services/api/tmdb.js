const TMDB_MOVIE_URL = "https://api.themoviedb.org/3/movie/popular"
const TMDB_API_URL = "https://api.themoviedb.org/3"

export async function getPopularMovies(page = 1) {
    const response = await fetch(`${TMDB_MOVIE_URL}?page=${page}`, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
        },
    })
    const data = await response.json()
    const movies = data.results
    return movies
}

async function fetchTvShowsPage(page = 1) {
    const url = new URL(`${TMDB_API_URL}/discover/tv`)

    url.searchParams.set("include_adult", "false")
    url.searchParams.set("include_null_first_air_dates", "false")
    url.searchParams.set("sort_by", "popularity.desc")
    url.searchParams.set("vote_count.gte", "1000")
    url.searchParams.set("vote_average.gte", "7")
    url.searchParams.set("without_genres", "10763,10764,10767")
    url.searchParams.set("page", page)

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
        },
    })
    return response.json()
}
function filterTvShows(shows) {
    return shows.filter((show) => {
        const isAnimation = show.genre_ids.includes(16)
        const isJapanese = show.origin_country?.includes("JP") || show.original_language === "ja"
        const filteredShows = !(isAnimation && isJapanese)
        return filteredShows
    })
}
function removeDuplicates(shows, existingIds) {
    return shows.filter((show) => {
        if (existingIds.has(show.id)) {
            return false
        }

        existingIds.add(show.id)
        return true
    })
}
export async function getPopularTvShows(page = 1, limit = 20) {
    let currentPage = page
    let tvShows = []
    const existingIds = new Set()

    while (tvShows.length < limit) {
        const data = await fetchTvShowsPage(currentPage)
        const filtered = removeDuplicates(filterTvShows(data.results), existingIds)
        tvShows.push(...filtered)

        currentPage++
    }

    return tvShows.slice(0, limit)
}
