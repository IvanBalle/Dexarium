import { useState, useRef } from "react"
import DB from "../../Backend/Database.json"

function SearchBar({ setSearchResults, setHasSearched }) {
    const [inputText, setInputText] = useState("")
    const inputRef = useRef(null)

    const handleSearch = (event) => {
        const nextValue = event.target.value.toLowerCase()
        setInputText(nextValue)
    }

    const sendSearch = () => {
        const query = inputRef.current?.value.toLowerCase().trim()

        const hasMatches =
            DB.games.some((game) => game.title.toLowerCase().includes(query)) ||
            DB.movies.some((movie) => movie.title.toLowerCase().includes(query)) ||
            DB.anime.some((anime) => anime.title.toLowerCase().includes(query)) ||
            DB.TVshows.some((tvshow) => tvshow.title.toLowerCase().includes(query))

        setHasSearched(true)

        if (!hasMatches) {
            setSearchResults([])
            console.log("No results found for:", query)
            return
        }

        const results = [
            { key: "games", titleKey: "Games", items: DB.games.filter((game) => game.title.toLowerCase().includes(query)) },
            { key: "movies", titleKey: "Movies", items: DB.movies.filter((movie) => movie.title.toLowerCase().includes(query)) },
            { key: "anime", titleKey: "Anime", items: DB.anime.filter((anime) => anime.title.toLowerCase().includes(query)) },
            { key: "tvshows", titleKey: "TV shows", items: DB.TVshows.filter((tvshow) => tvshow.title.toLowerCase().includes(query)) },
        ].filter((group) => group.items.length > 0)

        setSearchResults(results)
        console.log("Results found for:", results)
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault()
            sendSearch()
        }
    }

    return (
        <div className="search-bar-container">
            <input ref={inputRef} value={inputText} type="text" placeholder="Search..." id="search" name="search" className="search-bar" onChange={handleSearch} onKeyDown={handleKeyDown} />
            <button type="submit" className="search-button" onClick={sendSearch}>
                🔍
            </button>
        </div>
    )
}

export default SearchBar
