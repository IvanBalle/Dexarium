//import { useState } from "react"

import "./App.css"
import Nav from "./Components/Nav.jsx"
import DB from "../Backend/Database.json"

function App() {
    console.log(DB)

    return (
        <>
            <Nav />

            <section id="center"></section>

            <section id="next-steps"></section>
        </>
    )
}

export default App
