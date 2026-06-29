function DisplayFormatInStars({ value, keyName }) {
    if (Array.isArray(value)) {
        return value.join(", ")
    }

    if (keyName === "duration" && (typeof value === "number" || typeof value === "string")) {
        const numericValue = Number(String(value).replace(/[^0-9.-]/g, ""))

        if (!Number.isNaN(numericValue)) {
            const hours = Math.floor(numericValue / 60)
            const minutes = Math.round(numericValue % 60)

            if (hours > 0 && minutes > 0) {
                return `${hours}h${String(minutes).padStart(2, "0")}`
            }

            if (hours > 0) {
                return `${hours}h`
            }

            return `${minutes}min`
        }
    }

    if (keyName.toLowerCase().includes("score") && (typeof value === "number" || typeof value === "string")) {
        const numericValue = Number(String(value).replace(/[^0-9.-]/g, ""))

        if (!Number.isNaN(numericValue)) {
            const normalizedKey = keyName.toLowerCase().replace(/[^a-z]/g, "")
            const scaleByKey = {
                metacriticuserscore: 2,
                rottentomatoesscore: 20,
                myanimelistscore: 2,
                imdbscore: 2,
            }
            const divisor = scaleByKey[normalizedKey] || 2
            const normalizedValue = Math.max(0, Math.min(5, numericValue / divisor))
            const roundedValue = Math.round(normalizedValue * 2) / 2
            const fullStars = Math.floor(roundedValue)
            const hasHalfStar = roundedValue % 1 !== 0
            const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

            return `${"★".repeat(fullStars)}${hasHalfStar ? "☆" : ""}${"☆".repeat(emptyStars)}`
        }
    }

    return String(value)
}

export default DisplayFormatInStars
