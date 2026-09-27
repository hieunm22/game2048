import React from "react"
import { useSelector } from "react-redux"
import Tile from "./Tile"

const GameContainer = () => {
	const state = useSelector(st => st.home)
	return (
		<div className="game-container">
			<div className="grid-container">
				{state.currentMatrix.map((element, index) => {
					return (
						<Tile
							key={index}
							value={element}
							isNewTile={index === state.newTileLocationIndex || state.gameStatus === -1}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default GameContainer
