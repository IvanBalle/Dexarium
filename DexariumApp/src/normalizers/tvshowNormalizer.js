import { tvGenres } from "./genresNormalizer"
import { getTmdbImageUrl } from "./imageTMDBNormalizer"

export const normalizeTvShow = (tvshow) => {
    return {
        id: tvshow.id,
        type: "tvshow",
        title: tvshow.name,
        synopsis: tvshow.overview,
        releaseDate: tvshow.first_air_date,
        image: getTmdbImageUrl(tvshow.poster_path),
        backdrop_path: getTmdbImageUrl(tvshow.backdrop_path),
        score: tvshow.vote_average,
        ageRating: tvshow.adult ? "Adult" : "General",
        genres: tvshow.genre_ids?.map((id) => tvGenres[id]) ?? [],
        language: tvshow.original_language,
        countries: tvshow.origin_country ?? [],
    }
}
