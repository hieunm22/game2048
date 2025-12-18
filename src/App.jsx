import { Component } from "react"
import { connect } from "react-redux"
import "./App.css"
import { NEW_GAME_CONFIRMATION, BEST_SCORE_KEY, GAME_STATE_KEY } from "./common/constants"
import AboutGame from "./components/AboutGame"
import GameContainer from "./components/GameContainer"
import Header from "./components/Header"
import PopupGameStatus from "./components/PopupGameStatus"
import PopupHelp from "./components/PopupHelp"
import * as Helper from "./common/helper"
import { loadLastGameStatus, moveHandler, newGame } from "./slice"

class App extends Component {
	componentDidMount() {
		document.addEventListener("keyup", this.handleKeyPress, false)
		this.loadScore()
	}

	componentDidUpdate() {
		console.log(this.props.home)
	}

	handleKeyPress = e => {
		// if (this.props.home.gameStatus > 0) return
		let scoreAddition = 0
		const currentMatrix = [...this.props.home.currentMatrix]
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

		const state = Helper.doMove(this.props.home.currentMatrix, currentMatrix, scoreAddition, this.props)
		if (state) {
			this.props.moveHandler(state)
		}
	}

	loadScore = () => {
		const bestScore = localStorage.getItem(BEST_SCORE_KEY)
		const gameState = localStorage.getItem(GAME_STATE_KEY)

		Helper.loadScoreResult(bestScore, gameState, this.props.loadLastGameStatus, this.initNewGame)
	}

	initNewGame = () => {
		const newGame = Helper.initNewGameResult()

		this.props.newGame(newGame)
	}

	initNewgameHandler = () => {
		const { previousMatrix, currentMatrix } = this.props.home

		if (currentMatrix.toString() !== previousMatrix.toString()) {
			const areYouSure = window.confirm(NEW_GAME_CONFIRMATION)
			if (!areYouSure) return
		}
		this.initNewGame()
	}

	render() {
		return (
			<>
				<Header />
				<AboutGame newGameHandler={this.initNewgameHandler} />
				<GameContainer />
				<PopupGameStatus />
				<PopupHelp />
			</>
		)
	}
}

const mapStateToProps = state => ({
	home: state.home
})

const mapDispatchToProps = (dispatch) => ({
	loadLastGameStatus: value => dispatch(loadLastGameStatus(value)),
	moveHandler: value => dispatch(moveHandler(value)),
	newGame: value => dispatch(newGame(value)),
})

const connected = connect(
	mapStateToProps,
	mapDispatchToProps
)

export default connected(App)

