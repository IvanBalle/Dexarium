import { normalizeDate } from "./normalizeDate.js"

export const normalizeGame = (game) => {
    return {
        id: game.id,
        type: "game",
        title: game.name,
        releaseDate: normalizeDate(game.released),
        image: game.background_image,
        score: game.metacritic,
        ageRating: game.esrb_rating ? game.esrb_rating.name : null,
        genres: game.genres ? game.genres.map((genre) => genre.name) : [],
        tags: game.tags ? game.tags.map((tag) => tag.name) : [],
        platforms: game.platforms ? game.platforms.map((platform) => platform.platform.name) : [],
        stores: game.stores ? game.stores.map((store) => store.store.name) : [],
        AveragePlaytime: game.playtime,
    }
}
export const normalizeGameDetails = (game) => {
    return {
        ...normalizeGame(game),
        synopsis: game.description_raw ?? null,
    }
}
