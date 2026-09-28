import type { Matrix } from "store/types"

export interface SavedGame {
	matrix: Matrix
	score: number
	best: number
	keepPlaying: boolean
}
