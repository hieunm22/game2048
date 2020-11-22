import createStore from "redux-zero"

const initialState = {
  score: 0,
  scoreAddition: 0,
  newTileLocationIndex: -1,
  best: 0,
  currentMatrix: [],
  previousMatrix: []
}

const store = createStore(initialState)

export default store
