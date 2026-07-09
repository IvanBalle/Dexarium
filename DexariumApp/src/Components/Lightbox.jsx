import { useEffect } from "react"
import DisplayFormatInStars from "./DisplayFormatInStars.jsx"

function Lightbox({ item, onClose }) {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose?.()
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [onClose])

    if (!item) {
        return null
    }

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

    const detailEntries = Object.entries(item).filter(([key]) => !["id", "title", "imageUrl", "synopsis"].includes(key))
    const orderedDetails = [
        ...defaultOrder.filter((key) => key in item).map((key) => [key, item[key]]),
        ...detailEntries.filter(([key]) => !defaultOrder.includes(key)),
    ]

    return (
        <div className="lightbox-backdrop" onClick={onClose}>
            <div className="lightbox-panel" onClick={(event) => event.stopPropagation()}>
                <button className="lightbox-close" type="button" onClick={onClose} aria-label="Close details">
                    ×
                </button>
                <div className="lightbox-media" />
                <div className="lightbox-content">
                    <h2>{item.title || "Item details"}</h2>
                    {item.synopsis ? <p className="lightbox-synopsis">{item.synopsis}</p> : null}
                    <div className="lightbox-details">
                        {orderedDetails.map(([key, value]) => (
                            <div key={key} className="lightbox-detail">
                                <span className="lightbox-label">
                                    {(() => {
                                        const label = key.charAt(0).toUpperCase() + key.slice(1)
                                        return label.replace(/([a-z])([A-Z])/g, "$1 $2")
                                    })()}
                                </span>
                                <span className="lightbox-value">
                                    <DisplayFormatInStars value={value} keyName={key} />
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Lightbox