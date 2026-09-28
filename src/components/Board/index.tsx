import { useAppSelector } from "store"
import { CELLS } from "./constant"
import { Tile } from "./components"
import { useSwipe } from "./hooks"
import type { BoardProps } from "./types"
import "./Board.scss"

const Board = ({ onSwipe }: BoardProps) => {
	const tiles = useAppSelector(st => st.home.tiles)
	const { onPointerDown, onPointerUp, onPointerCancel } = useSwipe(onSwipe)

	return (
		<div
			className="board"
			onPointerDown={onPointerDown}
			onPointerUp={onPointerUp}
			onPointerCancel={onPointerCancel}
		>
			<div className="board__grid">
				{CELLS.map(cell => (
					<div key={cell} className="board__cell" />
				))}
			</div>
			<div className="board__tiles">
				{tiles.map(tile => (
					<Tile key={tile.id} tile={tile} />
				))}
			</div>
		</div>
	)
}

export default Board
