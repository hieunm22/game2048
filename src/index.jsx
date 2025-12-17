import "@fortawesome/fontawesome-pro/css/all.css"
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import React from "react"
import { Provider } from "react-redux"
import "./index.css"
import App from "./App"
import { store } from "./store"
import { createRoot } from "react-dom/client"

const root = document.getElementById("root")

createRoot(root).render(
	<Provider store={store}>
		<App />
	</Provider>
)

