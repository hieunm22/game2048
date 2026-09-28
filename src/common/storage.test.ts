import { beforeEach, describe, expect, test } from "vitest"
import { STORAGE_KEY } from "common/constants"
import { loadGame, saveGame } from "common/storage"

const board = [2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2]

beforeEach(() => localStorage.clear())

describe("storage", () => {
	test("a saved game reads back from the single key", () => {
		const game = { matrix: board, score: 12, best: 40, keepPlaying: true }
		saveGame(game)

		expect(loadGame()).toEqual(game)
		expect(Object.keys(localStorage)).toEqual([STORAGE_KEY])
	})

	test("the two legacy keys merge into the new key and are removed", () => {
		localStorage.setItem("gameState", JSON.stringify({ matrix: board, score: 12 }))
		localStorage.setItem("bestScore", "40")
		const game = loadGame()

		expect(game).toEqual({ matrix: board, score: 12, best: 40, keepPlaying: false })
		expect(Object.keys(localStorage)).toEqual([STORAGE_KEY])
	})

	test("a malformed value is ignored", () => {
		localStorage.setItem(STORAGE_KEY, "{not json")

		expect(loadGame()).toBeNull()
	})
})
