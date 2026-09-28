import { describe, expect, test } from "vitest"
import {
	checkGameResult,
	isGameInProgress,
	matrixFromTiles,
	moveTiles,
	tilesFromMatrix
} from "common/helper"
import type { Direction, Matrix } from "store/types"

function slide(matrix: Matrix, direction: Direction) {
	const tiles = tilesFromMatrix(matrix, "idle")
	const result = moveTiles(tiles, direction)
	const board = matrixFromTiles(result.tiles)
	return { ...result, board }
}

describe("moveTiles", () => {
	test("left merges equal neighbours once and returns the score", () => {
		const { board, scoreAddition } = slide([2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "left")

		expect(board.slice(0, 4)).toEqual([4, 4, 0, 0])
		expect(scoreAddition).toBe(8)
	})

	test("a merged tile does not merge again in the same move", () => {
		const { board } = slide([2, 2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "left")

		expect(board.slice(0, 4)).toEqual([4, 4, 0, 0])
	})

	test("right slides tiles to the right edge", () => {
		const { board } = slide([2, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "right")

		expect(board.slice(0, 4)).toEqual([0, 0, 2, 4])
	})

	test("up and down move along columns", () => {
		const up = slide([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0], "up")
		const down = slide([2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "down")

		expect(up.board[0]).toBe(2)
		expect(down.board[12]).toBe(2)
	})

	test("a moved tile keeps its id and both merge sources slide to the target", () => {
		const tiles = tilesFromMatrix([0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "idle")
		const [first, second] = tiles
		const result = moveTiles(tiles, "left")
		const sources = result.tiles.filter(tile => tile.kind === "merging")
		const merged = result.tiles.find(tile => tile.kind === "merged")

		expect(sources.map(tile => tile.id)).toEqual([first.id, second.id])
		expect(sources.map(tile => tile.index)).toEqual([0, 0])
		expect(merged).toMatchObject({ value: 4, index: 0 })
	})
})

describe("checkGameResult", () => {
	const won = [2048, 4, 2, 4, 4, 2, 4, 2, 2, 4, 2, 4, 4, 2, 4, 0]

	test("reaching 2048 is a win until the player keeps going", () => {
		expect(checkGameResult(won, false)).toBe(1)
		expect(checkGameResult(won, true)).toBe(0)
	})

	test("a full board with no merges is game over even after keeping going", () => {
		const full = [2048, 4, 2, 4, 4, 2, 4, 2, 2, 4, 2, 4, 4, 2, 4, 2]

		expect(checkGameResult(full, true)).toBe(2)
	})
})

describe("isGameInProgress", () => {
	const fresh = [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0]

	test("a fresh board is not in progress", () => {
		expect(isGameInProgress(fresh, 0)).toBe(false)
	})

	test("a restored or undone board with more tiles or any score is in progress", () => {
		const moved = [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0]
		const merged = [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0]

		expect(isGameInProgress(moved, 0)).toBe(true)
		expect(isGameInProgress(merged, 4)).toBe(true)
	})
})
