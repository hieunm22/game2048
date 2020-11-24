import React from 'react'
import { closePopup, newGame } from './../actions'
import { connect } from "redux-zero/react"
import { Classes, Overlay } from "@blueprintjs/core"
import { initNewGameResult } from '../common/helper'
import * as constants from '../common/constants'

const tryAgainHandler = props => () => {
  const newGameResult = initNewGameResult()
  props.newGame(newGameResult)
}

const PopupMessage = props => {
  const options = {
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    hasBackdrop: true,
    isOpen: props.gameStatus > 0,
    usePortal: true,
  }

  return (
    <Overlay
      onClose={props.closePopup}
      className={Classes.OVERLAY_SCROLL_CONTAINER}
      {...options}
    >
      <div className="overlay-dialog">
        <div className="overlay-header">
          Information
        </div>
        <div className="overlay-body">
          {
            props.gameStatus === 1 
              ? constants.GAME_STATUS_WIN
              : constants.GAME_STATUS_GOV
          }
        </div>
        <div className="overlay-footer">
          <span className="half-link" content="Continue" onClick={props.closePopup}>
            <i className="fas fa-arrow-right"></i>
          </span>
          or
          <span className="half-link" content="Try again" onClick={tryAgainHandler(props)}>
            <i className="fas fa-undo-alt"></i>
          </span>
        </div>
      </div>
    </Overlay>
  )
}

const mapToProps = ({ 
  gameStatus
}) => ({
  gameStatus
})

const actions = { closePopup, newGame }

const connected = connect(mapToProps, actions)

export default connected(PopupMessage)
