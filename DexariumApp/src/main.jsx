import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import RouterProvider from "./RouterProvider"



createRoot(document.getElementById("root")).render(
    
        <BrowserRouter>
            <RouterProvider />
        </BrowserRouter>
    
)
