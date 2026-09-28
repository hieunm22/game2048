import { MATRIX_SIZE } from "common/constants"
import { saveGame } from "common/storage"
import type { SavedGame } from "common/types"
import type {
	Direction,
	GameStatus,
	HomeState,
	Matrix,
	NewGamePayload,
	TileKind,
	TileState
} from "store/types"

interface MoveResult {
	tiles: TileState[]
	scoreAddition: number
}

const matrixSize = MATRIX_SIZE
const indexAtBottomRightCorner = matrixSize * matrixSize - 1

const STARTING_TILE_COUNT = 2

let lastTileId = 0

function createTile(value: number, index: number, kind: TileKind): TileState {
	lastTileId++
	return { id: lastTileId, value, index, kind }
}

export function initNewGameResult(best: number): NewGamePayload {
	const matrixArea = matrixSize * matrixSize
	const initMatrix = Array.from({ length: matrixArea }, () => 0)
	let newList = Array.from({ length: matrixArea }, (_, index) => index)
	for (let i = 0; i < STARTING_TILE_COUNT; i++) {
		const randomIndex = generateRandomNumber(matrixArea - i)
		const randomLocationIndex = newList[randomIndex]
		initMatrix[randomLocationIndex] = 2
		newList = newList.filter(element => element !== randomLocationIndex)
	}
	saveGame({ matrix: initMatrix, score: 0, best, keepPlaying: false })

	return {
		gameStatus: -1,
		initMatrix,
		tiles: tilesFromMatrix(initMatrix, "new"),
		bestScore: best
	}
}

export function restoreGame(saved: SavedGame): Partial<HomeState> {
	return {
		currentMatrix: saved.matrix,
		tiles: tilesFromMatrix(saved.matrix, "new"),
		score: saved.score,
		scoreAddition: saved.score,
		best: saved.best,
		keepPlaying: saved.keepPlaying,
		gameStatus: checkGameResult(saved.matrix, saved.keepPlaying)
	}
}

export function isGameInProgress(matrix: Matrix, score: number) {
	const tileCount = matrix.filter(value => value > 0).length
	return score > 0 || tileCount > STARTING_TILE_COUNT
}

function generateRandomNumber(max: number) {
	return Math.floor(Math.random() * max)
}

function getEmptyTileIndexes(accumulator: number[], element: number, index: number) {
	return element === 0 ? [...accumulator, index] : accumulator
}

function generateNewTileAfterMove(currentMatrix: Matrix) {
	const emptyTileIndexes = currentMatrix.reduce<number[]>(getEmptyTileIndexes, [])
	if (emptyTileIndexes.length === 0) {
		return -1
	}
	const randomIndex = generateRandomNumber(emptyTileIndexes.length)
	return emptyTileIndexes[randomIndex]
}

export function tilesFromMatrix(matrix: Matrix, kind: TileKind): TileState[] {
	const tiles: TileState[] = []
	matrix.forEach((value, index) => {
		if (value > 0) tiles.push(createTile(value, index, kind))
	})
	return tiles
}

export function matrixFromTiles(tiles: TileState[]): Matrix {
	const matrix = Array.from({ length: matrixSize * matrixSize }, () => 0)
	tiles.forEach(tile => {
		if (tile.kind !== "merging") matrix[tile.index] = tile.value
	})
	return matrix
}

function buildLines(direction: Direction) {
	const isRow = direction === "left" || direction === "right"
	const isReversed = direction === "right" || direction === "down"
	const lines: number[][] = []
	for (let i = 0; i < matrixSize; i++) {
		const line = Array.from({ length: matrixSize }, (_, j) =>
			isRow ? i * matrixSize + j : j * matrixSize + i
		)
		lines.push(isReversed ? line.reverse() : line)
	}
	return lines
}

export function moveTiles(tiles: TileState[], direction: Direction): MoveResult {
	const byIndex = new Map<number, TileState>()
	tiles.forEach(tile => {
		if (tile.kind !== "merging") byIndex.set(tile.index, tile)
	})

	const nextTiles: TileState[] = []
	let scoreAddition = 0
	for (const line of buildLines(direction)) {
		let target = 0
		let mergeCandidate: TileState | null = null
		for (const index of line) {
			const tile = byIndex.get(index)
			if (!tile) continue

			if (mergeCandidate && mergeCandidate.value === tile.value) {
				const value = tile.value * 2
				mergeCandidate.kind = "merging"
				nextTiles.push({ ...tile, index: mergeCandidate.index, kind: "merging" })
				nextTiles.push(createTile(value, mergeCandidate.index, "merged"))
				scoreAddition += value
				mergeCandidate = null
				continue
			}

			const moved: TileState = { ...tile, index: line[target], kind: "idle" }
			nextTiles.push(moved)
			mergeCandidate = moved
			target++
		}
	}

	return { tiles: nextTiles, scoreAddition }
}

export function doMove(home: HomeState, direction: Direction): Partial<HomeState> | null {
	const { tiles, scoreAddition } = moveTiles(home.tiles, direction)
	const newMatrix = matrixFromTiles(tiles)
	// no tiles was moved then no new tile will be generated
	if (newMatrix.toString() === home.currentMatrix.toString()) return null

	const newTileLocationIndex = generateNewTileAfterMove(newMatrix)
	if (newTileLocationIndex > -1) {
		newMatrix[newTileLocationIndex] = 2
		tiles.push(createTile(2, newTileLocationIndex, "new"))
	}
	// tiles keep the order they were created in; moving a DOM node would cancel its transition
	tiles.sort((a, b) => a.id - b.id)

	const newPoint = home.score + scoreAddition
	const best = Math.max(newPoint, home.best)
	saveGame({ matrix: newMatrix, score: newPoint, best, keepPlaying: home.keepPlaying })

	return {
		previousMatrix: home.currentMatrix,
		currentMatrix: newMatrix,
		tiles,
		scoreAddition,
		score: newPoint,
		best,
		gameStatus: checkGameResult(newMatrix, home.keepPlaying)
	}
}

export function checkGameResult(currentMatrix: Matrix, keepPlaying: boolean): GameStatus {
	let count2048 = 0,
		count0 = 0
	for (let i = 0; i < currentMatrix.length; i++) {
		if (currentMatrix[i] === 0) count0++
		if (currentMatrix[i] >= 2048) count2048++
	}

	if (count2048 > 0 && !keepPlaying) return 1 // win
	if (count0 === 0) {
		for (let i = 0; i < indexAtBottomRightCorner; i++) {
			const bottomIndex = i + matrixSize
			if (
				bottomIndex <= indexAtBottomRightCorner &&
				currentMatrix[i] === currentMatrix[bottomIndex]
			)
				return 0
			const rightIndex = i + 1
			if (rightIndex % matrixSize > 0 && currentMatrix[i] === currentMatrix[rightIndex]) return 0
			const leftIndex = i - 1
			if (i % matrixSize > 0 && currentMatrix[i] === currentMatrix[leftIndex]) return 0
			const topIndex = i - matrixSize
			if (i >= matrixSize && currentMatrix[i] === currentMatrix[topIndex]) return 0
		}
		return 2 // game over
	}
	return 0
}
