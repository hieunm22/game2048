import type { CSSProperties } from "react"
import classNames from "classnames"
import { MATRIX_SIZE } from "common/constants"
import { MAX_COLORED_VALUE, SWIPE_THRESHOLD } from "./constant"
import type { Direction, TileState } from "store/types"

export function tilePosition(index: number) {
	const row = Math.floor(index / MATRIX_SIZE)
	const col = index % MATRIX_SIZE
	return { "--row": row, "--col": col } as CSSProperties
}

export function tileFaceClassName({ value, kind }: TileState) {
	const hasOwnColor = value <= MAX_COLORED_VALUE
	return classNames("board__face", {
		[`board__face--v${value}`]: hasOwnColor,
		"board__face--small": value >= 100,
		"board__face--new": kind === "new",
		"board__face--merged": kind === "merged"
	})
}

export function swipeDirection(dx: number, dy: number): Direction | null {
	const isHorizontal = Math.abs(dx) >= Math.abs(dy)
	const distance = isHorizontal ? Math.abs(dx) : Math.abs(dy)
	if (distance < SWIPE_THRESHOLD) return null

	if (isHorizontal) return dx > 0 ? "right" : "left"
	return dy > 0 ? "down" : "up"
}
