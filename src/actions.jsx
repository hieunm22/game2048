export const newGame = (_, newGame) => ({
  gameStatus: newGame.gameStatus || 0,
  score: 0,
  best: newGame.bestScore,
  currentMatrix: newGame.initMatrix,
  previousMatrix: newGame.initMatrix
})

export const loadLastGameStatus = (_, state) => state

export const moveHandler = (_, state) => state

export const undo = (_, previousMatrix) => ({
  currentMatrix: previousMatrix
})

export const closePopup = _ => ({
  gameStatus: 0
})
