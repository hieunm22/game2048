import React from 'react'
import { undo } from './../actions'
import { connect } from "redux-zero/react"
import { Classes, Overlay } from "@blueprintjs/core"

const PopupMessage = props => {
  const options = {
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    hasBackdrop: true,
    isOpen: props.gameStatus > 0,
    usePortal: true,
  }
  console.log('props PopupMessage', props)
  return (
    <Overlay
      onClose={null}
      className={Classes.OVERLAY_SCROLL_CONTAINER}
      {...options}
    >
      <div className="overlay-dialog" id="changeConversationColor">
        <div className="overlay-header">
          Thong bao
        </div>
        <div className="overlay-body flex wrap">
          123
        </div>
        <div className="overlay-footer">
          <span className="wide-link" onClick={null}>Close</span>
        </div>
      </div>
    </Overlay>
  )
}

const actions = { undo }

const connected = connect(null, actions)

export default connected(PopupMessage)
