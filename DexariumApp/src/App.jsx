//import { useState } from "react"

import "./App.css"
import Nav from "./Components/Nav.jsx"
import DB from "../Backend/Database.json"
import Card from "./Components/Card.jsx"
import Carousel from "./Components/Carousel.jsx"

function App() {
    console.log(DB)

    const categories = [
        { key: "games", titleKey: "Games", items: DB.games || [] },
        { key: "movies", titleKey: "Movies", items: DB.movies || [] },
        { key: "animes", titleKey: "Animes", items: DB.animes || [] },
        { key: "tvshows", titleKey: "TV shows", items: DB.TVshows || [] },
    ]

    return (
        <>
            <Nav />

            <section className="center">
                {categories.map(({ key, titleKey, items }) => (
                    <section key={key} className="category-section">
                        <h2 className="category-title">{titleKey}</h2>
                        <Carousel containerKey={key}>
                            <Card item={items} titleKey={titleKey} />
                        </Carousel>
                    </section>
                ))}
            </section>
            <section id="next-steps"></section>
        </>
    )
}

export default App
