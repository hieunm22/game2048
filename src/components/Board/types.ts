import type { Direction, TileState } from "store/types"

export interface BoardProps {
	onSwipe: (direction: Direction) => void
}

export interface TileProps {
	tile: TileState
}

export interface SwipeStart {
	pointerId: number
	x: number
	y: number
}
