export const newGame = (_, initMatrix, best) => ({
  score: 0,
  best: best || 0,
  currentMatrix: initMatrix,
  previousMatrix: initMatrix
})

export const setBestScore = (_, best) => ({
  best: best || 0
})

export const loadGameState = (_, state) => state

export const moveHandler = (_, state) => state

export const undo = (_, previousMatrix) => ({
  currentMatrix: previousMatrix
})