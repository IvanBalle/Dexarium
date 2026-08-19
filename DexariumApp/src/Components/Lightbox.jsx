import { useEffect, useRef, useState } from "react"
import DisplayFormatInStars from "./DisplayFormatInStars.jsx"
import { getMovieDetails, getTvShowDetails } from "../Services/api/tmdb.js"
import { getAnimeDetails } from "../Services/api/jikan.js"
import { getGameDetails } from "../Services/api/rawg.js"

const DETAILS_ORDER = [
    "developer",
    "director",
    "studio",
    "creator",
    "publisher",
    "genres",
    "releaseYear",
    "country",
    "score",
    "averagePlaytime",
    "duration",
    "seasons",
    "episodes",
    "platforms",
    "status",
]
const HIDDEN_KEYS = new Set([
    "id",
    "type",
    "title",
    "slug",
    "synopsis",
    "image",
    "backdrop",
    "description",
    "releaseDate",
    "backdrop_path",
    "tagline",
    "title_english",
    "themes",
    "language",
    "countries",
    "mediaType",
])

const LABELS = {
    releaseYear: "Release Year",
    ageRating: "Age Rating",
    averagePlaytime: "Average Playtime",
}

const formatLabel = (key) => LABELS[key] || key.charAt(0).toUpperCase() + key.slice(1).replace(/([a-z])([A-Z])/g, "$1 $2")

const getDetails = (entry) => {
    if (!entry || typeof entry !== "object") return []
    const entries = Object.entries(entry).filter(([key, value]) => !HIDDEN_KEYS.has(key) && value != null && value !== "" && (!Array.isArray(value) || value.length))
    return [...DETAILS_ORDER.filter((key) => key in entry).map((key) => [key, entry[key]]), ...entries.filter(([key]) => !DETAILS_ORDER.includes(key))]
}

async function fetchDetails(item) {
    console.log(item)
    switch (item.type) {
        case "game":
            return getGameDetails(item.id)
        case "movie":
            return getMovieDetails(item.id)
        case "tvshow":
            return getTvShowDetails(item.id)
        case "anime":
            return getAnimeDetails(item.id)
        default:
            return item
    }
}

function Lightbox({ item, onClose }) {
    const [details, setDetails] = useState(item)
    const [loading, setLoading] = useState(false)
    const activeRequest = useRef(0)
    const closeButtonRef = useRef(null)

    useEffect(() => {
        if (!item) return
        activeRequest.current += 1
        const reqId = activeRequest.current

        // Delay state updates to avoid synchronous setState inside effect
        Promise.resolve().then(() => {
            setDetails(item)
            setLoading(true)
        })
        ;(async () => {
            try {
                const res = await fetchDetails(item)
                if (reqId === activeRequest.current) setDetails(res)
            } catch (error) {
                console.error("Error fetching details:", error)
                if (reqId === activeRequest.current) setDetails(item)
            } finally {
                if (reqId === activeRequest.current) setLoading(false)
            }
        })()

        return () => {
            // cancel this request by bumping the id so its results are ignored
            activeRequest.current += 1
        }
    }, [item])

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") onClose?.()
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [onClose])

    // lock body scroll and focus close button when open
    useEffect(() => {
        if (!item) return
        const prevOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        // focus the close button for keyboard users
        closeButtonRef.current?.focus()
        return () => {
            document.body.style.overflow = prevOverflow
        }
    }, [item])

    if (!item) return null

    const shown = details || item || {}

    return (
        <div className="lightbox-backdrop" onClick={onClose} aria-hidden={shown ? "false" : "true"}>
            <div className="lightbox-panel" role="dialog" aria-modal="true" aria-label={shown?.title || "Details"} onClick={(event) => event.stopPropagation()}>
                <button ref={closeButtonRef} className="lightbox-close" type="button" onClick={onClose} aria-label="Close details">
                    ×
                </button>
                <div className="lightbox-media">{shown.image ? <img src={shown.image} alt={shown.title || "item"} /> : <span>No image</span>}</div>
                <div className="lightbox-content">
                    <h2>{shown.title || "Item details"}</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : // hide synopsis for game entries because they can be very long
                    shown.type !== "game" && shown.synopsis ? (
                        <p className="lightbox-synopsis">{shown.synopsis}</p>
                    ) : null}
                    <div className="lightbox-details">
                        {getDetails(shown).map(([key, value]) => (
                            <div key={key} className="lightbox-detail">
                                <span className="lightbox-label">{formatLabel(key)}</span>
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
