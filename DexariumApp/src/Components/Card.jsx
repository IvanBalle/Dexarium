import DisplayFormatInStars from "./DisplayFormatInStars.jsx"

function Card({ item, detailsOrder }) {
    if (!item || !Array.isArray(item) || item.length === 0) {
        return null
    }

    // Default order: Publisher - Genres - Release Year - Country - Metacritic score - Average playtime
    const defaultOrder = [
        "publisher",
        "genres",
        "releaseYear",
        "country",
        "metacriticUserScore",
        "rottenTomatoesScore",
        "myAnimeListScore",
        "imdbScore",
        "averagePlaytime",
        "duration",
        "seasons",
        "episodes",
    ]
    const orderToUse = detailsOrder || defaultOrder

    const getDetailsByOrder = (entry) => {
        // Filter out excluded keys and order the remaining by the specified order
        const entryObj = Object.entries(entry).filter(([key]) => !["id", "title", "imageUrl", "synopsis"].includes(key))

        // Sort by the order specified, then add any remaining keys not in the order
        return [...orderToUse.filter((key) => key in entry).map((key) => [key, entry[key]]), ...entryObj.filter(([key]) => !orderToUse.includes(key))]
    }

    return (
        <>
            {item.map((entry) => (
                <article key={entry.id} className="card">
                    <div className="card-media"></div>
                    {/*  {entry.imageUrl && <div className="card-media">{<img src={entry.imageUrl} alt={entry.title || "item"} />}</div>} */}
                    {entry.title && <h2 className="card-title">{entry.title}</h2>}
                    {
                        <div className="card-details">
                            {getDetailsByOrder(entry).map(([key, value]) => (
                                <div key={key} className="card-detail">
                                    {(() => {
                                        const label = key.charAt(0).toUpperCase() + key.slice(1)
                                        return label.replace(/([a-z])([A-Z])/g, "$1 $2")
                                    })()}
                                    : <DisplayFormatInStars value={value} keyName={key} />
                                </div>
                            ))}
                        </div>
                    }
                </article>
            ))}
        </>
    )
}

export default Card
