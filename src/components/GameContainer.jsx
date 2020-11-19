import React from 'react'
import { connect } from "redux-zero/react"
import Tile from './Tile'
import { newGame, moveHandler, undo } from './../actions'

const GameContainer = ({ currentMatrix }) => {
  return (
    <div className="game-container">
      <div className="grid-container">
        {
          currentMatrix.map((element, index) => {
            return <Tile key={index} value={element} />
          })
        }
      </div>
    </div>
  )
}

const mapToProps = ({ 
  currentMatrix
}) => ({ 
  currentMatrix
})
const actions = { newGame, moveHandler, undo }

const connected = connect(mapToProps, actions)

export default connected(GameContainer)
