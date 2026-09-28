import classNames from "classnames"
import type { TileProps } from "./types"
import { tileFaceClassName, tilePosition } from "./common"

export const Tile = ({ tile }: TileProps) => {
	const tileCls = classNames("board__tile", { "board__tile--merged": tile.kind === "merged" })
	const faceCls = tileFaceClassName(tile)

	return (
		<div className={tileCls} style={tilePosition(tile.index)}>
			<div className={faceCls}>{tile.value}</div>
		</div>
	)
}
