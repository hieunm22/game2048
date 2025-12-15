import { useEffect } from "react"
import { connect } from "redux-zero/react"
import "./App.css"
import * as Helper from "./common/helper"
import AboveGame from "./components/AboveGame"
import GameContainer from "./components/GameContainer"
import Header from "./components/Header"
import { NEW_GAME_CONFIRMATION, BEST_SCORE_KEY, GAME_STATE_KEY } from "./common/constants"
import { newGame, moveHandler, undo, loadLastGameStatus } from "./actions"
import PopupGameStatus from "./components/PopupGameStatus"
import PopupHelp from "./components/PopupHelp"

const App = props => {
	useEffect(() => {
		document.addEventListener("keyup", handleKeyPress, false)
		loadScore()
	}, [])

	const handleKeyPress = e => {
		if ([1, 2, 3].includes(props.gameStatus)) return
		let scoreAddition = 0
		const currentMatrix = [...props.currentMatrix]
		switch (e.keyCode) {
			case 37: // left
				scoreAddition = Helper.moveLeft(currentMatrix)
				break
			case 38: // up
				scoreAddition = Helper.moveUp(currentMatrix)
				break
			case 39: // right
				scoreAddition = Helper.moveRight(currentMatrix)
				break
			case 40: // down
				scoreAddition = Helper.moveDown(currentMatrix)
				break
			default:
				break
		}

		const state = Helper.doMove(props.currentMatrix, currentMatrix, scoreAddition, props)
		if (state) {
			props.moveHandler(state)
		}
	}

	const loadScore = () => {
		const bestScore = localStorage.getItem(BEST_SCORE_KEY)
		const gameState = localStorage.getItem(GAME_STATE_KEY)

		Helper.loadScoreResult(bestScore, gameState, props.loadLastGameStatus, initNewGame)
	}

	const initNewGame = () => {
		const newGame = Helper.initNewGameResult()

		props.newGame(newGame)
	}

	const initNewgameHandler = () => {
		const { previousMatrix, currentMatrix } = props

		if (currentMatrix.toString() !== previousMatrix.toString()) {
			const areYouSure = window.confirm(NEW_GAME_CONFIRMATION)
			if (!areYouSure) return
		}
		initNewGame()
	}

	return (
		<>
			<Header />
			<AboveGame newGameHandler={initNewgameHandler} />
			<GameContainer />
			{props.gameStatus !== 4 && <PopupGameStatus />}
			<PopupHelp />
		</>
	)
}

const mapToProps = ({
	gameStatus,
	score,
	best,
	newTileLocationIndex,
	currentMatrix,
	previousMatrix
}) => ({
	gameStatus,
	score,
	best,
	newTileLocationIndex,
	currentMatrix,
	previousMatrix
})
const actions = {
	newGame,
	moveHandler,
	undo,
	loadLastGameStatus
}

const connected = connect(mapToProps, actions)

export default connected(App)
