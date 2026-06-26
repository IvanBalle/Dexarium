//import React from "react"

const Nav = () => {
    return (
        <nav className="navbar">
            <a className="navbar-logo" href="/">
                Dexarium
            </a>
            <span className="navbar-links">
                <a href="/games">Games</a>
                <a href="/movies">Movies</a>
                <a href="/anime">Anime</a>
                <a href="/tvshows">TV Shows</a>
            </span>
        </nav>
    )
}

export default Nav
