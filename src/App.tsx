import { useCallback, useEffect } from "react"
import { NEW_GAME_CONFIRMATION } from "common/constants"
import AboutGame from "components/AboutGame"
import Board from "components/Board"
import ConfirmProvider from "components/Confirm"
import Header from "components/Header"
import PopupGameStatus from "components/PopupGameStatus"
import PopupHelp from "components/PopupHelp"
import * as Helper from "common/helper"
import { loadGame } from "common/storage"
import { openPopup } from "components/Confirm/common"
import { useAppDispatch, useAppSelector } from "store"
import { loadLastGameStatus, moveHandler, newGame } from "store/slices/home"
import type { Direction } from "store/types"

const DIRECTIONS: Record<string, Direction> = {
	ArrowLeft: "left",
	ArrowUp: "up",
	ArrowRight: "right",
	ArrowDown: "down"
}

const App = () => {
	const dispatch = useAppDispatch()
	const home = useAppSelector(st => st.home)

	const initNewGame = useCallback(
		(best: number) => {
			const newGameResult = Helper.initNewGameResult(best)
			dispatch(newGame(newGameResult))
		},
		[dispatch]
	)

	useEffect(() => {
		const saved = loadGame()
		if (!saved) {
			initNewGame(0)
			return
		}
		const restored = Helper.restoreGame(saved)
		dispatch(loadLastGameStatus(restored))
	}, [dispatch, initNewGame])

	const moveTo = useCallback(
		(direction: Direction) => {
			// win, game over and help popups pause the board
			const isPaused = home.gameStatus > 0
			if (isPaused) return

			const state = Helper.doMove(home, direction)
			if (state) {
				dispatch(moveHandler(state))
			}
		},
		[dispatch, home]
	)

	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			const direction = DIRECTIONS[e.key]
			if (direction) moveTo(direction)
		}

		document.addEventListener("keyup", handleKeyPress, false)
		return () => document.removeEventListener("keyup", handleKeyPress, false)
	}, [moveTo])

	const initNewGameHandler = async () => {
		const inProgress = Helper.isGameInProgress(home.currentMatrix, home.score)

		if (inProgress) {
			const areYouSure = await openPopup({
				title: "Confirmation",
				description: NEW_GAME_CONFIRMATION
			})
			if (!areYouSure) return
		}
		initNewGame(home.best)
	}

	return (
		<ConfirmProvider>
			<Header />
			<AboutGame newGameHandler={initNewGameHandler} />
			<Board onSwipe={moveTo} />
			<PopupGameStatus />
			<PopupHelp />
		</ConfirmProvider>
	)
}

export default App
