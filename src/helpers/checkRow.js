import { MAX_ROW } from "../constants"
export const checkRow = (gameboard, col) => {
    for (let row = MAX_ROW - 1; row >= 0; row--) {
        if (gameboard[row][col] === 0) { return row }
    }
}