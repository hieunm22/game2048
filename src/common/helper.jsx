import { MATRIX_SIZE } from './constants'

const matrixSize = MATRIX_SIZE
const indexAtBottomRightCorner = matrixSize * matrixSize - 1

export function generateRandomNumber(max) {
  return Math.floor(Math.random() * max)
}

export function getEmptyTileIndexes(accumulator, element, index) {
  return element === 0 ? [...accumulator, index] : accumulator
}

function findNearestMovableIndexForLeftMove(lastIndexNotEmpty, index, array) {
  for (let i = lastIndexNotEmpty; i < index; i++) {
    if (array[i] === array[index] || array[i] === 0) return i
  }
  return index
}

export function moveLeft(currentMatrix) {
  let lastIndexNotEmpty = 0
  let pointCollected = 0
  for (let index = 0; index < currentMatrix.length; index++) {
    const mod = index % matrixSize
    // check if current tile is located at left edge
    if (mod === 0) {
      lastIndexNotEmpty = index
      continue
    }
    const element = currentMatrix[index]
    if (element === 0) continue
    const nearestMovableIndexForLeftMove = findNearestMovableIndexForLeftMove(lastIndexNotEmpty, index, currentMatrix)
    if (nearestMovableIndexForLeftMove !== index) {
      // do move left here
      pointCollected += currentMatrix[nearestMovableIndexForLeftMove]
      currentMatrix[nearestMovableIndexForLeftMove] += currentMatrix[index]
      currentMatrix[index] = 0
    }
    lastIndexNotEmpty = nearestMovableIndexForLeftMove
  }
  return pointCollected
}

function findNearestMovableIndexForRightMove(lastIndexNotEmpty, index, array) {
  for (let i = lastIndexNotEmpty; i > index; i--) {
    if (array[i] === array[index] || array[i] === 0) return i
  }
  return index
}

export function moveRight(currentMatrix) {
  let lastIndexNotEmpty = matrixSize * matrixSize - 1
  let pointCollected = 0
  for (let index = currentMatrix.length - 1; index >= 0; index--) {
    const mod = index % matrixSize
    // check if current tile is located at right edge
    if (mod === matrixSize - 1) {
      lastIndexNotEmpty = index
      continue
    }
    const element = currentMatrix[index]
    if (element === 0) continue
    const nearestMovableIndexForRightMove = findNearestMovableIndexForRightMove(lastIndexNotEmpty, index, currentMatrix)
    if (nearestMovableIndexForRightMove !== index) {
      // do move right here
      pointCollected += currentMatrix[nearestMovableIndexForRightMove]
      currentMatrix[nearestMovableIndexForRightMove] += currentMatrix[index]
      currentMatrix[index] = 0
    }
    lastIndexNotEmpty = nearestMovableIndexForRightMove
  }
  return pointCollected
}

function findNearestMovableIndexForDownMove(lastIndexNotEmpty, index, array) {
  for (let i = lastIndexNotEmpty; i > index; i -= matrixSize) {
    if (array[i] === 0 || array[i] === array[index]) return i
  }
  return index
}

export function moveDown(currentMatrix) {
  let pointCollected = 0
  let lastIndexNotEmpty = indexAtBottomRightCorner

  let index = lastIndexNotEmpty
  for (let j = 0; j < currentMatrix.length; j++) {
    // check if current tile is located at bottom edge
    if (index >= matrixSize * (matrixSize - 1)) {
      lastIndexNotEmpty = index
      index = index < matrixSize ? index - matrixSize + indexAtBottomRightCorner : index - matrixSize
      continue
    }
    const element = currentMatrix[index]
    if (element === 0) {
      index = index < matrixSize ? index - matrixSize + indexAtBottomRightCorner : index - matrixSize
      continue
    }
    const nearestMovableIndexForDownMove = findNearestMovableIndexForDownMove(lastIndexNotEmpty, index, currentMatrix)
    if (index !== nearestMovableIndexForDownMove) {
      pointCollected += currentMatrix[nearestMovableIndexForDownMove]
      currentMatrix[nearestMovableIndexForDownMove] += currentMatrix[index]
      currentMatrix[index] = 0
    }
    lastIndexNotEmpty = nearestMovableIndexForDownMove
    index = index < matrixSize ? index - matrixSize + indexAtBottomRightCorner : index - matrixSize
  }
  return pointCollected
}

function findNearestMovableIndexForUpMove(lastIndexNotEmpty, index, array) {
  for (let i = lastIndexNotEmpty; i < index; i += matrixSize) {
    if (array[i] === 0 || array[i] === array[index]) return i
  }
  return index
}

export function moveUp(currentMatrix) {
  let pointCollected = 0
  let lastIndexNotEmpty = indexAtBottomRightCorner

  let index = 0
  for (let j = 0; j < currentMatrix.length; j++) {
    // check if current tile is located at top edge
    if (index <= matrixSize - 1) {
      lastIndexNotEmpty = index
      index = index !== indexAtBottomRightCorner - matrixSize ? (index + matrixSize) % indexAtBottomRightCorner : index + matrixSize
      continue
    }
    const element = currentMatrix[index]
    if (element === 0) {
      index = index !== indexAtBottomRightCorner - matrixSize ? (index + matrixSize) % indexAtBottomRightCorner : index + matrixSize
      continue
    }
    const nearestMovableIndexForUpMove = findNearestMovableIndexForUpMove(lastIndexNotEmpty, index, currentMatrix)
    if (index !== nearestMovableIndexForUpMove) {
      pointCollected += currentMatrix[nearestMovableIndexForUpMove]
      currentMatrix[nearestMovableIndexForUpMove] += currentMatrix[index]
      currentMatrix[index] = 0
    }
    lastIndexNotEmpty = nearestMovableIndexForUpMove
    index = index !== indexAtBottomRightCorner - matrixSize ? (index + matrixSize) % indexAtBottomRightCorner : index + matrixSize
  }
  return pointCollected
}

export function checkGameResult(currentMatrix) {
  let count2048 = 0, count0 = 0
  for (let i = 0; i < currentMatrix.length; i++) {
    if (currentMatrix[i] === 0) count0++
    if (currentMatrix[i] === 2048) count2048++
  }

  if (count2048 > 0) return 1 // win
  if (count0 === 0) {
    for (let i = 0; i < indexAtBottomRightCorner; i++) {
      const bottomIndex = i + matrixSize
      if (bottomIndex <= indexAtBottomRightCorner && currentMatrix[i] === currentMatrix[bottomIndex]) return 0
      const rightIndex = i + 1
      if (rightIndex % matrixSize > 0 && currentMatrix[i] === currentMatrix[rightIndex]) return 0
      const leftIndex = i - 1
      if (i % matrixSize > 0 && currentMatrix[i] === currentMatrix[leftIndex]) return 0
      const topIndex = i - matrixSize
      if (i >= matrixSize && currentMatrix[i] === currentMatrix[topIndex]) return 0
    }
    return 2
  }
  return 0
}
