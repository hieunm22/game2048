import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Classes, Overlay } from "@blueprintjs/core"
import * as constants from "../common/constants"
import { closePopup, continueOnGameOver, newGame } from "../slice"
import { initNewGameResult } from "../common/helper"

const PopupGameStatus = () => {
	const state = useSelector(st => st.home)
	const dispatch = useDispatch()
	const options = {
		canEscapeKeyClose: false,
		canOutsideClickClose: false,
		enforceFocus: true,
		hasBackdrop: true,
		isOpen: state.gameStatus === 1 || state.gameStatus === 2,
		usePortal: true
	}

	const tryAgainHandler = () => {
		const newGameResult = initNewGameResult()
		dispatch(newGame(newGameResult))
	}
	
	const keepGoingHandler = () => {
		dispatch(continueOnGameOver())
	}

	const message = state.gameStatus === 1 ? constants.GAME_STATUS_WIN : constants.GAME_STATUS_GOV

	return (
		<Overlay onClose={() => dispatch(closePopup())} className={Classes.OVERLAY_SCROLL_CONTAINER} {...options}>
			<div className="overlay-dialog">
				<div className="overlay-header" />
				<div className="overlay-body" content={message} />

				{state.gameStatus === 1 ? (
					<div className="overlay-footer flex">
						<span className="half-link" content="Keep going" onClick={keepGoingHandler}>
							<i className="fas fa-arrow-right" />
						</span>
						or
						<span className="half-link" content="Try again" onClick={tryAgainHandler}>
							<i className="fas fa-undo-alt" />
						</span>
					</div>
				) : (
					<div className="overlay-footer flex">
						<span className="half-link-center" content="Try again" onClick={tryAgainHandler}>
							<i className="fas fa-undo-alt" />
						</span>
					</div>
				)}
			</div>
		</Overlay>
	)
}

export default PopupGameStatus
