import React from 'react'
import { undo } from './../actions'
import { connect } from "redux-zero/react"

const AboveGame = ({ currentMatrix, previousMatrix, newGameHandler, undo }) => {
  const undoHandler = () => undo(previousMatrix)

  const cantUndo = currentMatrix.toString() === previousMatrix.toString() 
          || previousMatrix.length === 0
          || currentMatrix.filter(e => e === 2048).length > 0

  return (
    <div className="above-game flex">
      <p className="game-intro">Join the tiles, get to <strong>2048!</strong>
        <br />
        <span className="how-to-play-link">How to play →</span>
      </p>
      {
        cantUndo 
          ? <div className="restart-button" onClick={newGameHandler} />
        : (
        <div className="buttons flex">
          <div className="undo-button" onClick={undoHandler} />
          <div className="restart-button" onClick={newGameHandler} />
        </div>
        )
      }
    </div>
  )
}

const actions = { undo }

const connected = connect(null, actions)

export default connected(AboveGame)
