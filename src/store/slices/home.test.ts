import { describe, expect, test } from "vitest"
import reducer, { moveHandler, undo } from "store/slices/home"

describe("undo", () => {
	test("restores the previous board and takes back the points of the last move", () => {
		const before = reducer(undefined, { type: "init" })
		const afterMove = reducer(
			before,
			moveHandler({
				score: 12,
				scoreAddition: 4,
				previousMatrix: [2, 2, 0, 0],
				currentMatrix: [4, 0, 0, 2]
			})
		)
		const afterUndo = reducer(afterMove, undo([]))

		expect(afterUndo.score).toBe(8)
		expect(afterUndo.scoreAddition).toBe(0)
		expect(afterUndo.tiles).toEqual([])
		expect(afterUndo.currentMatrix).toEqual([2, 2, 0, 0])
		expect(afterUndo.previousMatrix).toEqual([])
	})
})
