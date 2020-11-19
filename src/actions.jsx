export const newGame = (_, initMatrix, best) => ({
  score: 0,
  best: best || 0,
  currentMatrix: initMatrix,
  previousMatrix: initMatrix
})

export const setBestScore = (_, best) => ({
  best: best || 0
})

export const loadGameState = (_, objSetState) => ({
  score: objSetState.score || 0,
  best: objSetState.best || 0,
  currentMatrix: objSetState.currentMatrix,
})

export const moveHandler = (_, score, best, currentMatrix, previousMatrix) => ({
  score,
  best,
  currentMatrix,
  previousMatrix
})

export const undo = (_, previousMatrix) => ({
  currentMatrix: previousMatrix
})