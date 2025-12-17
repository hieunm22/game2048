import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { openGuidePopup, undo } from "../slice"

const AboveGame = props => {
	const dispatch = useDispatch()
	const state = useSelector(st => st.home)
	const {
		score,
		scoreAddition,
		currentMatrix,
		previousMatrix
	} = state
	const undoHandler = () => dispatch(undo(score, scoreAddition, previousMatrix))

	const cantUndo =
		currentMatrix.toString() === previousMatrix.toString() ||
		previousMatrix.length === 0 ||
		currentMatrix.filter(e => e === 2048).length > 0

	return (
		<div className="above-game flex">
			<p className="game-intro">
				Join the tiles, get to <strong>2048!</strong>
				<br />
				<span className="how-to-play-link" onClick={() => dispatch(openGuidePopup())}>
					How to play →
				</span>
			</p>
			{cantUndo ? (
				<div className="restart-button" onClick={props.newGameHandler} />
			) : (
				<div className="buttons flex">
					<div className="undo-button" onClick={undoHandler} />
					<div className="restart-button" onClick={props.newGameHandler} />
				</div>
			)}
		</div>
	)
}

export default AboveGame
