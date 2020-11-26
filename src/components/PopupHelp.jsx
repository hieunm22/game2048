import React from 'react'
import { closePopup } from '../actions'
import { connect } from "redux-zero/react"
import { Classes, Overlay } from "@blueprintjs/core"
import { HOW_TO_PLAY } from '../common/constants'

const PopupHelp = props => {
  const options = {
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    hasBackdrop: true,
    isOpen: props.gameStatus === 3,
    usePortal: true,
  }

  return (
    <Overlay
      onClose={props.closePopup}
      className={Classes.OVERLAY_SCROLL_CONTAINER}
      {...options}
    >
      <div className="overlay-dialog">
        <div className="overlay-header" />
        <div className="overlay-body-help">{HOW_TO_PLAY}</div>
        <div className="overlay-footer">
          <span className="half-link-center" content="Close" onClick={props.closePopup} />
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

const actions = { closePopup }

const connected = connect(mapToProps, actions)

export default connected(PopupHelp)
