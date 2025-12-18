import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Classes, Overlay2 } from "@blueprintjs/core"
import { HOW_TO_PLAY } from "../common/constants"
import { closePopup } from "../slice"

const PopupHelp = () => {
	const state = useSelector(st => st.home)
	const dispatch = useDispatch()
	const options = {
		canEscapeKeyClose: true,
		canOutsideClickClose: true,
		enforceFocus: true,
		hasBackdrop: true,
		isOpen: state.gameStatus === 3,
		usePortal: true
	}

	return (
		<Overlay2 onClose={() => dispatch(closePopup())} className={Classes.OVERLAY_SCROLL_CONTAINER} {...options}>
			<div className="overlay-dialog">
				<div className="overlay-header" />
				<div className="overlay-body-help">{HOW_TO_PLAY}</div>
				<div className="overlay-footer">
					<span className="half-link-center" content="Close" onClick={() => dispatch(closePopup())} />
				</div>
			</div>
		</Overlay2>
	)
}

export default PopupHelp
