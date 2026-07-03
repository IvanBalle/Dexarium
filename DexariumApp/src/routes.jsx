import { Navigate } from "react-router-dom"
import App from "./App.jsx"

const routes = [
    {
        path: "/",
        element: <App initialCategory={null} />,
    },
    {
        path: "/games",
        element: <App initialCategory="games" />,
    },
    {
        path: "/movies",
        element: <App initialCategory="movies" />,
    },
    {
        path: "/anime",
        element: <App initialCategory="anime" />,
    },
    {
        path: "/tvshows",
        element: <App initialCategory="tvshows" />,
    },
    {
        path: "*",
        element: <Navigate to="/" replace />,
    },
]

export default routes
