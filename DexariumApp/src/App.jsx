import { useState } from "react"
import "./App.css"
import Nav from "./Components/Nav.jsx"
import DB from "../Backend/Database.json"
import Card from "./Components/Card.jsx"
import Carousel from "./Components/Carousel.jsx"
import SearchBar from "./Components/SearchBar.jsx"
import FilterList from "./Components/FilterList.jsx"
import Lightbox from "./Components/Lightbox.jsx"
import { matchesFilters } from "./Utils/MatchesFilter.js"
import { useFetch } from "./Hooks/fetch_hook.js"
import { getPopularMovies, getPopularTvShows } from "./Services/api/tmdb.js"
import { getAnime } from "./Services/api/jikan.js"
import { getPopularGames } from "./Services/api/rawg.js"

function App({ initialCategory = null }) {
    console.log(DB)

    const categories = [
        { key: "games", titleKey: "Games", items: DB.games || [] },
        { key: "movies", titleKey: "Movies", items: DB.movies || [] },
        { key: "anime", titleKey: "Anime", items: DB.anime || [] },
        { key: "tvshows", titleKey: "TV shows", items: DB.TVshows || [] },
    ]

    const selectedCategory = categories.some((item) => item.key === initialCategory) ? initialCategory : null

    const [searchResults, setSearchResults] = useState([])
    const [hasSearched, setHasSearched] = useState(false)
    const [activeFilters, setActiveFilters] = useState({})
    const [selectedItem, setSelectedItem] = useState(null)

    const visibleCategories = selectedCategory ? categories.filter(({ key }) => key === selectedCategory) : categories
    const filteredSearchResults = selectedCategory ? searchResults.filter(({ key }) => key === selectedCategory) : searchResults

    const movies = useFetch(getPopularMovies);
    const tvShows = useFetch(getPopularTvShows);
    console.log("Movies title :", movies.map((movie) => movie.title))
    console.log("TV Shows title :",tvShows.map((tvshow) => tvshow.name))
    const anime = useFetch(getAnime)
    console.log("Anime title JP :", anime.map((oneAnime) => oneAnime.title.default))
    console.log("Anime title EN :", anime.map((oneAnime) => oneAnime.title.english != null ? oneAnime.title.english : oneAnime.title.default))
    const games = getPopularGames
    console.log("Game title", games)
    const getFilteredItems = (items, categoryKey) => {
        if (!items) return []

        return items.filter((item) => {
            const matchesCategory = !selectedCategory || categoryKey === selectedCategory
            const matchesSearch = !searchResults.length || filteredSearchResults.some((group) => group.key === categoryKey)

            const matchesFiltersForItem = Object.entries(activeFilters).every(([fullKey, selectedValues]) => {

                const [filterCategory, filterKey] = fullKey.split(".");

                if (filterCategory !== categoryKey) {
                    return true;
                }

                return matchesFilters(item,filterKey,selectedValues);
            });

            return matchesCategory && matchesSearch && matchesFiltersForItem
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
            <Nav />
            <section className="center">
                <section className="app-intro">
                    <h1 className="app-title">Dexarium</h1>
                    <p className="app-description">Discover and explore a wide range of games, movies, anime, and TV shows.</p>
                    <p className="app-description">Use the search bar to find specific titles or apply filters to narrow down your options.</p>
                    <p className="app-description">Click on any item to view more details about it.</p>
                    <p className="app-description">Enjoy your journey through the world of entertainment!</p>
                </section>
            
            <section className="content">
                <SearchBar setSearchResults={setSearchResults} setHasSearched={setHasSearched} />
                <FilterList onFiltersChange={setActiveFilters} selectedCategory={selectedCategory} />
                {hasSearched && searchResults.length === 0 ? (
                    <h3 className="no-results">Error 404: No results found</h3>
                ) : searchResults.length > 0 ? (
                    renderableSearchResults.map((group) => (
                        <section key={group.key} className="category-section">
                            <h2 className="category-title">{group.titleKey}</h2>
                            <Carousel containerKey={group.key}>
                                <Card item={group.items} titleKey={group.titleKey} onSelectItem={setSelectedItem} />
                            </Carousel>
                        </section>
                    ))
                ) : (
                    renderableCategories.map(({ key, titleKey, items }) => (
                        <section key={key} className="category-section">
                            <h2 className="category-title">{titleKey}</h2>
                            <Carousel containerKey={key}>
                                <Card item={items} titleKey={titleKey} onSelectItem={setSelectedItem} />
                            </Carousel>
                        </section>
                    ))
                )}
                </section>
            </section>
            <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />
        </>
    )
}

export default App
