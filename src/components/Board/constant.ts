import { MATRIX_SIZE } from "common/constants"

export const CELLS = Array.from({ length: MATRIX_SIZE * MATRIX_SIZE }, (_, index) => index)

export const SWIPE_THRESHOLD = 30

export const MAX_COLORED_VALUE = 2048
