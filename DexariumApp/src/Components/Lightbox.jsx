import { useEffect, useState } from "react"
import DisplayFormatInStars from "./DisplayFormatInStars.jsx"
import { getGameDetails } from "../Services/api/rawg.js"
import { normalizeGameDetails } from "../normalizers/gameNormalizer.js"

function Lightbox({ item, onClose }) {
    const [details, setDetails] = useState(item)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!item) {
            return
        }

        const fetchDetails = async () => {
            setLoading(true)

            try {
                const game = await getGameDetails(item.id)
                const normalizedGame = normalizeGameDetails(game)

                setDetails(normalizedGame)
            } catch (error) {
                console.error("Error fetching game details:", error)
                setDetails(item)
            } finally {
                setLoading(false)
            }
        }

        fetchDetails()
    }, [item])

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose?.()
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
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

    const detailEntries = Object.entries(details).filter(([key]) => !["id", "title", "slug", "synopsis"].includes(key))

    const orderedDetails = [...defaultOrder.filter((key) => key in details).map((key) => [key, details[key]]), ...detailEntries.filter(([key]) => !defaultOrder.includes(key))]

    return (
        <div className="lightbox-backdrop" onClick={onClose}>
            <div className="lightbox-panel" onClick={(event) => event.stopPropagation()}>
                <button className="lightbox-close" type="button" onClick={onClose} aria-label="Close details">
                    ×
                </button>

                <div className="lightbox-media" />

                <div className="lightbox-content">
                    <h2>{details.title || "Item details"}</h2>

                    {loading ? <p>Loading...</p> : details.synopsis ? <p className="lightbox-synopsis">{details.synopsis}</p> : null}

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
