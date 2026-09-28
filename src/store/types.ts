export type Matrix = number[]

// -1 new game, 0 playing, 1 win, 2 game over, 3 help popup
export type GameStatus = -1 | 0 | 1 | 2 | 3

export type Direction = "left" | "right" | "up" | "down"

export type TileKind = "idle" | "new" | "merged" | "merging"

export interface TileState {
	id: number
	value: number
	index: number
	kind: TileKind
}

export interface HomeState {
	gameStatus: GameStatus
	score: number
	scoreAddition: number
	best: number
	currentMatrix: Matrix
	previousMatrix: Matrix
	tiles: TileState[]
	// set once the player chooses to keep going after reaching 2048
	keepPlaying: boolean
}

export interface NewGamePayload {
	gameStatus: GameStatus
	initMatrix: Matrix
	tiles: TileState[]
	bestScore: number
}
