import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { HomeState, NewGamePayload, TileState } from "store/types"

const initialState: HomeState = {
	gameStatus: 0,
	score: 0,
	scoreAddition: 0,
	best: 0,
	currentMatrix: [],
	previousMatrix: [],
	tiles: [],
	keepPlaying: false
}

const homeSlice = createSlice({
	name: "home",
	initialState,
	reducers: {
		closePopup: state => {
			state.gameStatus = 0
		},
		continueAfterWin: state => {
			state.gameStatus = 0
			state.keepPlaying = true
		},
		loadLastGameStatus: (state, action: PayloadAction<Partial<HomeState>>) => {
			Object.assign(state, action.payload)
		},
		moveHandler: (state, action: PayloadAction<Partial<HomeState>>) => {
			Object.assign(state, action.payload)
		},
		newGame: (state, action: PayloadAction<NewGamePayload>) => {
			const payload = action.payload
			state.gameStatus = payload.gameStatus
			state.score = 0
			state.best = payload.bestScore
			state.currentMatrix = payload.initMatrix
			state.previousMatrix = payload.initMatrix
			state.tiles = payload.tiles
			state.keepPlaying = false
		},
		openGuidePopup: state => {
			state.gameStatus = 3
		},
		undo: (state, action: PayloadAction<TileState[]>) => {
			state.score -= state.scoreAddition
			state.scoreAddition = 0
			state.currentMatrix = state.previousMatrix
			state.previousMatrix = []
			state.tiles = action.payload
		}
	}
})

export const {
	closePopup,
	continueAfterWin,
	loadLastGameStatus,
	moveHandler,
	newGame,
	openGuidePopup,
	undo
} = homeSlice.actions

export default homeSlice.reducer
