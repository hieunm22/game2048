export const newGame = (_, newGame) => ({
  score: 0,
  best: newGame.best,
  currentMatrix: newGame.initMatrix,
  previousMatrix: newGame.initMatrix
})

export const loadLastGameStatus = (_, state) => state

export const moveHandler = (_, state) => state

export const undo = (_, previousMatrix) => ({
  currentMatrix: previousMatrix
})