import { Component } from 'react'
import { connect } from "redux-zero/react"
import './App.css'
import { 
  generateRandomNumber, 
  getEmptyTileIndexes, 
  moveLeft, 
  moveRight,
  moveDown,
  moveUp,
  checkGameResult
} from './common/helper'
import AboveGame from './components/AboveGame'
import GameContainer from './components/GameContainer'
import Header from './components/Header'
import { MATRIX_SIZE, BEST_SCORE_KEY, GAME_STATE_KEY } from './common/constants'
import { newGame, moveHandler, undo, setBestScore, loadGameState } from './actions'

class App extends Component {
  componentDidMount() {
    document.addEventListener("keyup", this.handleKeyPress, false)
    this.loadScore()
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.handleKeyPress, false)
  }

  componentDidUpdate() {
    const gameResult = checkGameResult(this.props.currentMatrix)
    if (gameResult === 1) {
      alert('You win')
      // document.removeEventListener("keyup", this.handleKeyPress, false)
    }
    if (gameResult === 2) {
      alert('Game over')
      // document.removeEventListener("keyup", this.handleKeyPress, false)
    }
  }

  handleKeyPress = e => {
    let pointCollected = 0
    const currentMatrix = [...this.props.currentMatrix]
    switch (e.keyCode) {
      case 37:  // left
        pointCollected = moveLeft(currentMatrix)
        break;
      case 38:  // up
        pointCollected = moveUp(currentMatrix)
        break;
      case 39:  // right
        pointCollected = moveRight(currentMatrix)
        break;
      case 40:  // down
        pointCollected = moveDown(currentMatrix)
        break;
      default:
        break;
    }

    const movable = this.props.currentMatrix.toString() !== currentMatrix.toString()

    if (movable) {  // no tiles was moved then no new tile will be generated
      const newTileLocationIndex = this.generateNewTileAfterMove(currentMatrix)
      if (newTileLocationIndex > -1) {
        currentMatrix[newTileLocationIndex] = 2
      }
    }
    const previousMatrix = movable
      ? [...this.props.currentMatrix]
      : [...this.props.previousMatrix]
    const newPoint = this.props.score + pointCollected
    if (pointCollected > 0) {
      localStorage.setItem(BEST_SCORE_KEY, newPoint)
    }
    const score = newPoint
    const gameState = {
      matrix: currentMatrix,
      score
    }
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState))
    const best = Math.max(newPoint, this.props.best)
    this.props.moveHandler(score, best, currentMatrix, previousMatrix)
  }
  
  loadScore = () => {
    const bestScore = localStorage.getItem(BEST_SCORE_KEY)
    const objSetState = {}
    if (bestScore && bestScore > 0) {
      objSetState.best = bestScore
    }
    const gameState = localStorage.getItem(GAME_STATE_KEY)
    if (gameState) {
      try {
        const json = JSON.parse(gameState)
        if (json.matrix && json.matrix.length === MATRIX_SIZE * MATRIX_SIZE && json.score && json.score > 0) {
          objSetState.currentMatrix = json.matrix
          objSetState.score = json.score
          this.props.loadGameState(objSetState)
        }
        else {
          this.initNewGame()
        }
      } catch (e) {
        this.initNewGame()
      }
    }
    else {
      this.initNewGame()
    }
  }

  initNewGame = () => {
    const matrixArea = MATRIX_SIZE * MATRIX_SIZE
    const initMatrix = Array.from({ length: matrixArea }).map(_ => 0)
    let newList = Array.from({ length: matrixArea }).map((_, index) => index)
    for (let i = 0; i < 2; i++) {
      const randomIndex = generateRandomNumber(16 - i)
      const randomLocationIndex = newList[randomIndex]
      initMatrix[randomLocationIndex] = 2
      newList = newList.filter(element => element !== randomLocationIndex)
    }
    const bestScore = localStorage.getItem(BEST_SCORE_KEY)
    // document.addEventListener("keyup", this.handleKeyPress, false)

    const gameState = {
      matrix: initMatrix,
      score: 0
    }
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState))

    this.props.newGame(initMatrix, bestScore)
  }

  undoHandler = previousMatrix => () => {
    this.props.undo(previousMatrix)
  }

  generateNewTileAfterMove = currentMatrix => {
    const emptyTileIndexes = currentMatrix.reduce(getEmptyTileIndexes, [])
    if (emptyTileIndexes.length === 0) {
      return -1
    }
    const randomIndex = generateRandomNumber(emptyTileIndexes.length)
    return emptyTileIndexes[randomIndex]
  }

  render() {
    return (
      <>
        <Header />
        <AboveGame newGameHandler={this.initNewGame} />
        <GameContainer />
      </>
    )
  }
}

const mapToProps = ({ 
  score,
  best,
  currentMatrix,
  previousMatrix
}) => ({ 
  score,
  best,
  currentMatrix,
  previousMatrix
})
const actions = { 
  newGame,
  setBestScore,
  moveHandler,
  undo,
  loadGameState
}

const connected = connect(mapToProps, actions)

export default connected(App)
