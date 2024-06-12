import createStore from "redux-zero"

const initialState = {
  // -1: new game, 0: playing game, 1: win, 2: gameover, 3: show help popup
  gameStatus: 0,
  score: 0,
  scoreAddition: 0,
  newTileLocationIndex: -1,
  best: 0,
  currentMatrix: [],
  previousMatrix: []
}

const store = createStore(initialState)

export default store
