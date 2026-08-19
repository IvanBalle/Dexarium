import DisplayFormatInStars from "./DisplayFormatInStars.jsx"

const LABELS = {
    releaseYear: "Release Year",
    ageRating: "Age Rating",
    averagePlaytime: "Average Playtime",
    metacriticUserScore: "Metacritic User Score",
    myAnimeListScore: "MyAnimeList Score",
}

function formatLabel(key) {
    return LABELS[key] || key.charAt(0).toUpperCase() + key.slice(1).replace(/([a-z])([A-Z])/g, "$1 $2")
}

function Card({ item, detailsOrder, onSelectItem }) {
    if (!Array.isArray(item) || item.length === 0) return null

    const defaultOrder = ["developer", "director", "studio", "creator", "publisher", "genres", "releaseDate", "country", "score", "averagePlaytime", "duration", "seasons", "episodes"]
    const orderToUse = detailsOrder || defaultOrder

    const getDetailsByOrder = (entry) => {
        const hidden = new Set(["id", "type", "title", "slug", "synopsis", "image", "backdrop", "tagline", "title_english", "backdrop_path", "themes", "tags", "language", "countries", "mediaType"])
        const remaining = Object.entries(entry).filter(([key, value]) => !hidden.has(key) && value != null && value !== "" && (!Array.isArray(value) || value.length))
        return [...orderToUse.filter((key) => key in entry).map((key) => [key, entry[key]]), ...remaining.filter(([key]) => !orderToUse.includes(key))]
    }

    return item.map((entry) => (
        <article
            key={`${entry.type}-${entry.id}`}
            className="card"
            onClick={() => onSelectItem?.(entry)}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault()
                    onSelectItem?.(entry)
                }
            }}
            tabIndex={0}
            role="button"
        >
            <div className="card-media">{entry.image ? <img src={entry.image} alt={entry.title || "item"} loading="lazy" /> : <span>No image</span>}</div>
            <h2 className="card-title">{entry.title || "Untitled"}</h2>
            <div className="card-details">
                {getDetailsByOrder(entry)
                    .slice(0, 5)
                    .map(([key, value]) => (
                        <div key={key} className="card-detail">
                            {formatLabel(key)}: <DisplayFormatInStars value={value} keyName={key} />
                        </div>
                    ))}
            </div>
        </article>
    ))
}

export default Card
