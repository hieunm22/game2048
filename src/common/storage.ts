import { MATRIX_SIZE, STORAGE_KEY } from "common/constants"
import type { SavedGame } from "common/types"

// keys written by earlier versions, read once and then removed
const LEGACY_GAME_STATE_KEY = "gameState"
const LEGACY_BEST_SCORE_KEY = "bestScore"

function parseJson(raw: string | null): unknown {
	if (raw === null) return null
	try {
		return JSON.parse(raw)
	} catch {
		return null
	}
}

function toSavedGame(value: unknown): SavedGame | null {
	if (typeof value !== "object" || value === null) return null

	const { matrix, score, best, keepPlaying } = value as Partial<SavedGame>
	const hasBoard =
		Array.isArray(matrix) &&
		matrix.length === MATRIX_SIZE * MATRIX_SIZE &&
		matrix.every(cell => typeof cell === "number")
	if (!hasBoard) return null

	const savedScore = Number(score) || 0
	const savedBest = Number(best) || 0
	return {
		matrix,
		score: savedScore,
		best: Math.max(savedBest, savedScore),
		keepPlaying: keepPlaying === true
	}
}

function migrateLegacyGame(): SavedGame | null {
	const legacyState = localStorage.getItem(LEGACY_GAME_STATE_KEY)
	const legacyBest = localStorage.getItem(LEGACY_BEST_SCORE_KEY)
	if (legacyState === null && legacyBest === null) return null

	localStorage.removeItem(LEGACY_GAME_STATE_KEY)
	localStorage.removeItem(LEGACY_BEST_SCORE_KEY)

	const state = parseJson(legacyState)
	const merged = typeof state === "object" ? { ...state, best: legacyBest } : null
	const game = toSavedGame(merged)
	if (game) saveGame(game)
	return game
}

export function loadGame(): SavedGame | null {
	const raw = localStorage.getItem(STORAGE_KEY)
	if (raw === null) return migrateLegacyGame()

	const value = parseJson(raw)
	return toSavedGame(value)
}

export function saveGame(game: SavedGame) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(game))
}
