import { configureStore } from "@reduxjs/toolkit"
import stateReducer from "./slice"

export const store = configureStore({
	reducer: {
		home: stateReducer
	}
})
