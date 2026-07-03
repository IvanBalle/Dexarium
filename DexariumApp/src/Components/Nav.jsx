import { NavLink } from "react-router-dom"

const Nav = () => {
    const isActiveClass = ({ isActive }) => (isActive ? "active" : "")

    return (
        <nav className="navbar">
            <NavLink className="navbar-logo" to="/" end>
                <div className="navbar-logo-icon-placeholder"></div>
                Dexarium
            </NavLink>
            <span className="navbar-links">
                <NavLink to="/games" className={isActiveClass}>
                    Games
                </NavLink>
                <NavLink to="/movies" className={isActiveClass}>
                    Movies
                </NavLink>
                <NavLink to="/anime" className={isActiveClass}>
                    Anime
                </NavLink>
                <NavLink to="/tvshows" className={isActiveClass}>
                    TV Shows
                </NavLink>
            </span>
        </nav>
    )
}

export default Nav
