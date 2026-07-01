import { useState } from "react"
import "./App.css"
import Nav from "./Components/Nav.jsx"
import DB from "../Backend/Database.json"
import Card from "./Components/Card.jsx"
import Carousel from "./Components/Carousel.jsx"
import SearchBar from "./Components/SearchBar.jsx"
import FilterList from "./Components/FilterList.jsx"

function App() {
    console.log(DB)

    const categories = [
        { key: "games", titleKey: "Games", items: DB.games || [] },
        { key: "movies", titleKey: "Movies", items: DB.movies || [] },
        { key: "anime", titleKey: "Anime", items: DB.anime || [] },
        { key: "tvshows", titleKey: "TV shows", items: DB.TVshows || [] },
    ]
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [searchResults, setSearchResults] = useState([])
    const [hasSearched, setHasSearched] = useState(false)
    const [activeFilters, setActiveFilters] = useState({})

    const visibleCategories = selectedCategory ? categories.filter(({ key }) => key === selectedCategory) : categories
    const filteredSearchResults = selectedCategory ? searchResults.filter(({ key }) => key === selectedCategory) : searchResults

    const getFilteredItems = (items, categoryKey) => {
        if (!items) return []

        return items.filter((item) => {
            const matchesCategory = !selectedCategory || categoryKey === selectedCategory
            const matchesSearch = !searchResults.length || filteredSearchResults.some((group) => group.key === categoryKey)

            const matchesFilters = Object.entries(activeFilters).every(([filterKey, selectedValues]) => {
                if (!selectedValues.length) return true

                if (filterKey === "releaseYear") {
                    return selectedValues.includes(item.releaseYear)
                }

                if (filterKey === "country") {
                    return selectedValues.includes(item.country)
                }

                if (filterKey === "publisher") {
                    return selectedValues.includes(item.publisher)
                }

                if (filterKey.startsWith("genres:")) {
                    const genreCategory = filterKey.replace("genres:", "")
                    if (selectedCategory && genreCategory !== selectedCategory) {
                        return true
                    }
                    return genreCategory === categoryKey && selectedValues.some((value) => item.genres?.includes(value))
                }

                return true
            })

            return matchesCategory && matchesSearch && matchesFilters
        })
    }

    const renderableCategories = visibleCategories
        .map((category) => ({
            ...category,
            items: getFilteredItems(category.items, category.key),
        }))
        .filter((category) => category.items.length > 0)

    const renderableSearchResults = filteredSearchResults
        .map((group) => ({
            ...group,
            items: getFilteredItems(group.items, group.key),
        }))
        .filter((group) => group.items.length > 0)

    return (
        <>
            <Nav onCategoryChange={setSelectedCategory} />
            <section className="center">
                <SearchBar setSearchResults={setSearchResults} setHasSearched={setHasSearched} />
                <FilterList onFiltersChange={setActiveFilters} selectedCategory={selectedCategory} />
                {hasSearched && searchResults.length === 0 ? (
                    <h3 className="no-results">Error 404: No results found</h3>
                ) : searchResults.length > 0 ? (
                    renderableSearchResults.map((group) => (
                        <section key={group.key} className="category-section">
                            <h2 className="category-title">{group.titleKey}</h2>
                            <Carousel containerKey={group.key}>
                                <Card item={group.items} titleKey={group.titleKey} />
                            </Carousel>
                        </section>
                    ))
                ) : (
                    renderableCategories.map(({ key, titleKey, items }) => (
                        <section key={key} className="category-section">
                            <h2 className="category-title">{titleKey}</h2>
                            <Carousel containerKey={key}>
                                <Card item={items} titleKey={titleKey} />
                            </Carousel>
                        </section>
                    ))
                )}
            </section>
        </>
    )
}

export default App
