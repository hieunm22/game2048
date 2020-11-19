import createStore from "redux-zero"

const initialState = {
  score: 0,
  best: 0,
  currentMatrix: [],
  previousMatrix: []
}

const store = createStore(initialState)

export default store
