import { Component } from 'react'
import { connect } from "redux-zero/react"
import './App.css'
import * as Helper from './common/helper'
import AboveGame from './components/AboveGame'
import GameContainer from './components/GameContainer'
import Header from './components/Header'
import {
  NEW_GAME_CONFIRMATION,
  BEST_SCORE_KEY,
  GAME_STATE_KEY
} from './common/constants'
import {
  newGame,
  moveHandler,
  undo,
  loadLastGameStatus,
} from './actions'
import PopupGameStatus from './components/PopupGameStatus'
import PopupHelp from './components/PopupHelp'

class App extends Component {
  componentDidMount() {
    document.addEventListener("keyup", this.handleKeyPress, false)
    this.loadScore()
  }

  handleKeyPress = e => {
    if (this.props.gameStatus > 0) return
    let scoreAddition = 0
    const currentMatrix = [...this.props.currentMatrix]
    switch (e.keyCode) {
      case 37:  // left
        scoreAddition = Helper.moveLeft(currentMatrix)
        break
      case 38:  // up
        scoreAddition = Helper.moveUp(currentMatrix)
        break
      case 39:  // right
        scoreAddition = Helper.moveRight(currentMatrix)
        break
      case 40:  // down
        scoreAddition = Helper.moveDown(currentMatrix)
        break
      default:
        break
    }

    const state = Helper.doMove(this.props.currentMatrix, currentMatrix, scoreAddition, this.props)
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
    const {
      previousMatrix,
      currentMatrix
    } = this.props

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
        <AboveGame newGameHandler={this.initNewgameHandler} />
        <GameContainer />
        <PopupGameStatus />
        <PopupHelp />
      </>
    )
  }
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
  loadLastGameStatus,
}

const connected = connect(mapToProps, actions)

export default connected(App)
