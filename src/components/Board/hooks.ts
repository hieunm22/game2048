import { useRef, type PointerEvent } from "react"
import { swipeDirection } from "./common"
import type { Direction } from "store/types"
import type { SwipeStart } from "./types"

export function useSwipe(onSwipe: (direction: Direction) => void) {
	const start = useRef<SwipeStart | null>(null)

	const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
		if (!e.isPrimary) return
		start.current = { pointerId: e.pointerId, x: e.clientX, y: e.clientY }
	}

	const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
		const from = start.current
		start.current = null
		if (!from || from.pointerId !== e.pointerId) return

		const dx = e.clientX - from.x
		const dy = e.clientY - from.y
		const direction = swipeDirection(dx, dy)
		if (direction) onSwipe(direction)
	}

	const onPointerCancel = () => {
		start.current = null
	}

	return { onPointerDown, onPointerUp, onPointerCancel }
}
