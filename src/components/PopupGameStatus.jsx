import React from 'react'
import { closePopup, newGame } from '../actions'
import { connect } from "redux-zero/react"
import { Classes, Overlay } from "@blueprintjs/core"
import { initNewGameResult } from '../common/helper'
import * as constants from '../common/constants'

const tryAgainHandler = props => () => {
  const newGameResult = initNewGameResult()
  props.newGame(newGameResult)
}

const PopupGameStatus = props => {
  const options = {
    canEscapeKeyClose: false,
    canOutsideClickClose: false,
    enforceFocus: true,
    hasBackdrop: true,
    isOpen: props.gameStatus === 1 || props.gameStatus === 2,
    usePortal: true,
  }

  const message = props.gameStatus === 1
      ? constants.GAME_STATUS_WIN
      : constants.GAME_STATUS_GOV

  return (
    <Overlay
      onClose={props.closePopup}
      className={Classes.OVERLAY_SCROLL_CONTAINER}
      {...options}
    >
      <div className="overlay-dialog">
        <div className="overlay-header" />
        <div className="overlay-body" content={message} />

        {props.gameStatus === 1 ? (
          <div className="overlay-footer flex">
            <span className="half-link" content="Keep going" onClick={props.closePopup}>
              <i className="fas fa-arrow-right" />
            </span>
            or
            <span className="half-link" content="Try again" onClick={tryAgainHandler(props)}>
              <i className="fas fa-undo-alt" />
            </span>
          </div>)
          : (
            <div className="overlay-footer flex">
              <span className="half-link-center" content="Try again" onClick={tryAgainHandler(props)}>
                <i className="fas fa-undo-alt" />
              </span>
            </div>)
        }
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

export default connected(PopupGameStatus)
