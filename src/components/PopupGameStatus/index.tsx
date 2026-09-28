import { GAME_STATUS_GOV, GAME_STATUS_WIN } from "common/constants"
import Dialog, { DialogButton } from "components/Dialog"
import { initNewGameResult } from "common/helper"
import { saveGame } from "common/storage"
import { useAppDispatch, useAppSelector } from "store"
import { closePopup, continueAfterWin, newGame } from "store/slices/home"

const PopupGameStatus = () => {
	const state = useAppSelector(st => st.home)
	const dispatch = useAppDispatch()
	const isWin = state.gameStatus === 1
	const isOpen = isWin || state.gameStatus === 2

	const tryAgainHandler = () => {
		const newGameResult = initNewGameResult(state.best)
		dispatch(newGame(newGameResult))
	}

	const keepGoingHandler = () => {
		const { currentMatrix, score, best } = state
		saveGame({ matrix: currentMatrix, score, best, keepPlaying: true })
		dispatch(continueAfterWin())
	}

	const footer = isWin ? (
		<>
			<DialogButton label="Keep going" icon="fas fa-arrow-right" onClick={keepGoingHandler} />
			or
			<DialogButton label="Try again" icon="fas fa-undo-alt" onClick={tryAgainHandler} />
		</>
	) : (
		<DialogButton label="Try again" icon="fas fa-undo-alt" muted onClick={tryAgainHandler} />
	)

	return (
		<Dialog
			isOpen={isOpen}
			closable={false}
			onClose={() => dispatch(closePopup())}
			variant="message"
			body={isWin ? GAME_STATUS_WIN : GAME_STATUS_GOV}
			footer={footer}
		/>
	)
}

export default PopupGameStatus
