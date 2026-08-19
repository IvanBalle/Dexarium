import { normalizeDate } from "./normalizeDate.js"

export const normalizeAnime = (anime) => {
    return {
        id: anime.mal_id,
        type: "anime",
        title: anime.title,
        title_english: anime.title_english === null ? anime.title : anime.title_english,
        synopsis: anime.synopsis,
        releaseDate: normalizeDate(anime.aired?.from),
        image: anime.images && anime.images.jpg ? anime.images.jpg.image_url : null,
        score: anime.score,
        ageRating: anime.rating,
        genres: anime.genres ? anime.genres.map((genre) => genre.name) : [],
        themes: anime.themes ? anime.themes.map((theme) => theme.name) : [],
        studios: anime.studios?.map((studio) => studio.name) ?? [],
        episodes: anime.episodes,
        status: anime.status,
        mediaType: anime.type,
    }
}
