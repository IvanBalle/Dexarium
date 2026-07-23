const RAWG_GAMES_API_URL = "https://api.rawg.io/api/games"


export async function getPopularGames() {
    const response = await fetch(
        `${RAWG_GAMES_API_URL}`,
        {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_RAWG_API_TOKEN}`
            }
        }
    );
    const data = await response.json()
    const games = data.results
    console.log(games)
    return games
}
