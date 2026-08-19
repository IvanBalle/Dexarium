export const getTmdbImageUrl = (path, size = "original") => {
    if (!path) return null

    return `https://image.tmdb.org/t/p/${size}${path}`
}
