import { useRef, useState } from "react"

function SearchBar({ categories, setSearchResults, setHasSearched }) {
    const [inputText, setInputText] = useState("")
    const inputRef = useRef(null)

    const handleSearch = (event) => setInputText(event.target.value)

    const sendSearch = () => {
        const query = inputRef.current?.value.toLowerCase().trim() || ""
        const results = categories
            .map(({ key, titleKey, items }) => ({
                key,
                titleKey,
                items: (items || []).filter((item) => item.title?.toLowerCase().includes(query)),
            }))
            .filter((group) => group.items.length > 0)

        setHasSearched(true)
        setSearchResults(results)
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
            <button type="button" className="search-button" onClick={sendSearch} aria-label="Search">
                🔍
            </button>
        </div>
    )
}

export default SearchBar
