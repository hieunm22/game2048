import { tilesFromMatrix } from "common/helper"
import { saveGame } from "common/storage"
import { useAppDispatch, useAppSelector } from "store"
import { openGuidePopup, undo } from "store/slices/home"
import type { AboutGameProps } from "./types"
import "./AboutGame.scss"

const AboutGame = (props: AboutGameProps) => {
	const dispatch = useAppDispatch()
	const state = useAppSelector(st => st.home)
	const { best, currentMatrix, gameStatus, keepPlaying, previousMatrix, score, scoreAddition } =
		state

	const undoHandler = () => {
		const restoredScore = score - scoreAddition
		const restoredTiles = tilesFromMatrix(previousMatrix, "idle")
		saveGame({ matrix: previousMatrix, score: restoredScore, best, keepPlaying })
		dispatch(undo(restoredTiles))
	}

	const cantUndo =
		currentMatrix.toString() === previousMatrix.toString() ||
		previousMatrix.length === 0 ||
		(currentMatrix.filter(e => e === 2048).length > 0 && gameStatus === 1)

	return (
		<div className="about-game">
			<p className="about-game__intro">
				Join the tiles, get to <strong>2048!</strong>
				<br />
				<span className="about-game__help-link" onClick={() => dispatch(openGuidePopup())}>
					How to play →
				</span>
			</p>
			<div className="about-game__buttons">
				{!cantUndo && (
					<button type="button" className="about-game__button" onClick={undoHandler}>
						Undo
					</button>
				)}
				<button type="button" className="about-game__button" onClick={props.newGameHandler}>
					New Game
				</button>
			</div>
		</div>
	)
}

export default AboutGame
