export const normalizeGame = (game) => {
    return {
        id: game.id,
        title: game.name,
        releaseDate: game.released ? new Date(game.released).toISOString().split("T")[0] : null,
        genres: game.genres ? game.genres.map((genre) => genre.name) : [],
        platforms: game.platforms ? game.platforms.map((platform) => platform.platform.name) : [],
        stores: game.stores ? game.stores.map((store) => store.store.name) : [],
        image_url: game.background_image,
        score: game.metacritic,
        rating: game.esrb_rating ? game.esrb_rating.name : null,
        AveragePlaytime: game.playtime,
        tags: game.tags ? game.tags.map((tag) => tag.name) : [],
    }
}