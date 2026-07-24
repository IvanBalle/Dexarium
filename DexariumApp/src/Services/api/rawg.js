const RAWG_GAMES_API_URL = `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_API_TOKEN}`

export async function getPopularGames(page = 1) {
    const response = await fetch(`${RAWG_GAMES_API_URL}&page=${page}`)
    const data = await response.json()
    const games = data.results
    return games
}
