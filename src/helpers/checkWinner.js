export const checkWinner = (gameboard, isPlayerTurn, checkWinnerRow, checkWinnerCol) => {
    const r = checkWinnerRow;
    const c = checkWinnerCol;
    const checkLeft = () => {
        let row = r;
        let col = c;
        let count = 0;
        if (c === 0) { return count }
        while (col > 0 && gameboard[row][col] === gameboard[row][col - 1]) {
            count++;
            col--;
        }
        return count
    }
    const checkRight = () => {
        let row = r;
        let col = c;
        let count = 0;
        if (c === 6) { return count }
        while (col < 6 && gameboard[row][col] === gameboard[row][col + 1]) {
            count++;
            col++;
        }
        return count
    }
    const checkDown = () => {
        let row = r;
        let col = c;
        let count = 0;
        if (r > 2) { return count }
        while (row < 5 && gameboard[row][col] === gameboard[row + 1][col]) {
            count++;
            row++;
        }
        return count
    }
    const checkLeftUp = () => {
        let row = r;
        let col = c;
        let count = 0;
        if (c === 0 || r === 0) { return count }
        while (row > 0 && col > 0 && gameboard[row][col] === gameboard[row - 1][col - 1]) {
            count++;
            row--;
            col--;
        }
        return count
    }
    const checkLeftDown = () => {
        let row = r;
        let col = c;
        let count = 0;
        if (c === 0 || r === 5) { return count }
        while (row < 5 && col > 0 && gameboard[row][col] === gameboard[row + 1][col - 1]) {
            count++;
            row++;
            col--;
        }
        return count
    }
    const checkRightUp = () => {
        let row = r;
        let col = c;
        let count = 0;
        if (c === 6 || r === 0) { return count }
        while (row > 0 && col < 6 && gameboard[row][col] === gameboard[row - 1][col + 1]) {
            count++;
            row--;
            col++;
        }
        return count
    }
    const checkRightDown = () => {
        let row = r;
        let col = c;
        let count = 0;
        if (c === 6 || r === 5) { return count }
        while (row < 5 && col < 6 && gameboard[row][col] === gameboard[row + 1][col + 1]) {
            count++;
            row++;
            col++;
        }
        return count
    }

    if (checkLeft() + checkRight() === 3 || checkDown() === 3 ||
        checkLeftUp() + checkRightDown() === 3 || checkRightUp() + checkLeftDown() === 3) {
        if (isPlayerTurn) { return 'Computer' }
        else { return 'User' }
    }

    for (let j = 0; j < 7; j++) {
        // eslint-disable-next-line no-cond-assign
        if (gameboard[0][j] === 0) return null;
    }
    return 'draw';
}