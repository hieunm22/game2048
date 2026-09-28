import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import "@fortawesome/fontawesome-free/css/all.css"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "store"
import App from "./App"
import "./styles/global.scss"

const root = document.getElementById("root") as HTMLElement

createRoot(root).render(
	<Provider store={store}>
		<App />
	</Provider>
)
