import { useState } from "react"

const Nav = ({ onCategoryChange }) => {
    const [activeCategory, setActiveCategory] = useState(null)

    const handleCategoryClick = (category) => {
        setActiveCategory(category)
        onCategoryChange(category)
    }

    const isActive = (category) => activeCategory === category

    return (
        <nav className="navbar">
            <a className="navbar-logo" href="/">
                <div className="navbar-logo-icon-placeholder"></div>
                Dexarium
            </a>
            <span className="navbar-links">
                <a
                    href="/games"
                    className={isActive("games") ? "active" : ""}
                    aria-current={isActive("games") ? "page" : undefined}
                    onClick={(e) => {
                        e.preventDefault()
                        handleCategoryClick("games")
                    }}
                >
                    Games
                </a>
                <a
                    href="/movies"
                    className={isActive("movies") ? "active" : ""}
                    aria-current={isActive("movies") ? "page" : undefined}
                    onClick={(e) => {
                        e.preventDefault()
                        handleCategoryClick("movies")
                    }}
                >
                    Movies
                </a>
                <a
                    href="/anime"
                    className={isActive("anime") ? "active" : ""}
                    aria-current={isActive("anime") ? "page" : undefined}
                    onClick={(e) => {
                        e.preventDefault()
                        handleCategoryClick("anime")
                    }}
                >
                    Anime
                </a>
                <a
                    href="/tvshows"
                    className={isActive("tvshows") ? "active" : ""}
                    aria-current={isActive("tvshows") ? "page" : undefined}
                    onClick={(e) => {
                        e.preventDefault()
                        handleCategoryClick("tvshows")
                    }}
                >
                    TV Shows
                </a>
            </span>
        </nav>
    )
}

export default Nav
