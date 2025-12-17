import React from "react"
import { useSelector } from "react-redux"
import { Classes, Overlay } from "@blueprintjs/core"
import { HOW_TO_PLAY } from "../common/constants"

const PopupHelp = props => {
	const state = useSelector(st => st.home)
	const options = {
		canEscapeKeyClose: true,
		canOutsideClickClose: true,
		enforceFocus: true,
		hasBackdrop: true,
		isOpen: state.gameStatus === 3,
		usePortal: true
	}

	return (
		<Overlay onClose={state.closePopup} className={Classes.OVERLAY_SCROLL_CONTAINER} {...options}>
			<div className="overlay-dialog">
				<div className="overlay-header" />
				<div className="overlay-body-help">{HOW_TO_PLAY}</div>
				<div className="overlay-footer">
					<span className="half-link-center" content="Close" onClick={state.closePopup} />
				</div>
			</div>
		</Overlay>
	)
}

export default PopupHelp
