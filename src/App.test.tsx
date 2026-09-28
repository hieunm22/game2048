import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { expect, test } from "vitest"
import { store } from "store"
import App from "./App"

test("renders the board with two starting tiles", () => {
	const { container } = render(
		<Provider store={store}>
			<App />
		</Provider>
	)
	const tiles = container.querySelectorAll(".board__cell")
	const filled = container.querySelectorAll(".board__face--v2")

	expect(screen.getByText("2048", { selector: "h1" })).toBeInTheDocument()
	expect(tiles).toHaveLength(16)
	expect(filled).toHaveLength(2)
})
