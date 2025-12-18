/* eslint-disable max-lines, max-len */
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	// -1: new game, 0: playing game, 1: win, 2: gameover, 3: show help popup, 4: continue on game over
	gameStatus: 0,
	score: 0,
	scoreAddition: 0,
	newTileLocationIndex: -1,
	best: 0,
	currentMatrix: [],
	previousMatrix: []
}

const homeSlice = createSlice({
	name: "home",
	initialState,
	reducers: {
		closePopup: (state) => {
			state.gameStatus = 0
		},
		continueOnGameOver: (state) => {
			state.gameStatus = 4
		},
		loadLastGameStatus: (state, newState) => {
			Object.assign(state, newState.payload)
		},
		moveHandler: (state, newState) => {
			Object.assign(state, newState.payload)
		},
		newGame: (state, newState) => {
			state.gameStatus = newState.gameStatus || 0
			state.score = 0
			state.best = newState.bestScore
			state.currentMatrix = newState.initMatrix
			state.previousMatrix = newState.initMatrix
		},
		openGuidePopup: (state) => {
			state.gameStatus = 3
		},
		undo: (state, action) => {
			state.score = action.score
			state.scoreAddition = action.payload.scoreAddition
			state.previousMatrix = action.payload.previousMatrix
		},
	}
})

export const {
	closePopup,
	continueOnGameOver,
	loadLastGameStatus,
	moveHandler,
	newGame,
	openGuidePopup,
	undo
} = homeSlice.actions

const { reducer } = homeSlice
export default reducer
