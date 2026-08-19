import { movieGenres } from "./genresNormalizer"
import { getTmdbImageUrl } from "./imageTMDBNormalizer"

export const normalizeMovie = (movie) => {
    return {
        id: movie.id,
        type: "movie",
        title: movie.title,
        synopsis: movie.overview,
        releaseDate: movie.release_date,
        image: getTmdbImageUrl(movie.poster_path),
        backdrop_path: getTmdbImageUrl(movie.backdrop_path),
        score: movie.vote_average,
        ageRating: movie.adult ? "Adult" : "General",
        genres: movie.genre_ids?.map((id) => movieGenres[id]) ?? [],
        language: movie.original_language,
    }
}
