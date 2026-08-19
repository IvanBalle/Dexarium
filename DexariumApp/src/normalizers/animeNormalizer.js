export const normalizeAnime = (anime) => {
    return {
        id: anime.mal_id,
        title: anime.title,
        title_english: anime.title_english === null ? anime.title : anime.title_english,
        studio: anime.studios && anime.studios.length > 0 ? anime.studios[0].name : null,
        genres: anime.genres ? anime.genres.map((genre) => genre.name) : [],
        themes: anime.themes ? anime.themes.map((theme) => theme.name) : [],
        releaseDate: anime.aired && anime.aired.from ? new Date(anime.aired.from).toISOString().split("T")[0] : null,
        image_url: anime.images && anime.images.jpg ? anime.images.jpg.image_url : null,
        synopsis: anime.synopsis,
        score: anime.score,
        episodes: anime.episodes,
        status: anime.status,
        rating: anime.rating,
    }
}