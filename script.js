const playerRed = "R";
const playerYellow = "Y";
let currPlayer = playerRed;

let gameOver = false;
let board;
const rows = 6;
const columns = 7;
const currColumns = [5, 5, 5, 5, 5, 5, 5];

window.onload = function() {
    setGame();
}

function setGame() {
    board = [];

    for (let i = 0; i < rows; ++i) {
        let row = [];
        for (let j = 0; j < columns; ++j) {
            row.push(' ');
            let tile = document.createElement("div");
            tile.id = i.toString() + "-" + j.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");
    let i = parseInt(coords[0]);
    let j = parseInt(coords[1]);

    i = currColumns[j]; 
    if (i < 0) { 
        return;
    }

    board[i][j] = currPlayer;
    let tile = document.getElementById(i.toString() + "-" + j.toString());
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    } else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
    }

    i -= 1; 
    currColumns[j] = i; 

    checkWinner();
}

function checkWinner() {
    const directions = [
        [0, 1], // horizontal
        [1, 0], // vertical
        [1, 1], // diagonal
        [-1, 1] // anti-diagonal
    ];

    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < columns; ++j) {
            const player = board[i][j];
            if (player !== ' ') {
                for (let d = 0; d < directions.length; ++d) {
                    const dir = directions[d];
                    if (checkSequence(i, j, dir[0], dir[1])) {
                        setWinner(i, j);
                        return;
                    }
                }
            }
        }
    }
}

function checkSequence(row, col, rowStep, colStep) {
    const player = board[row][col];
    let count = 1;

    for (let step = 1; step < 4; ++step) {
        const newRow = row + step * rowStep;
        const newCol = col + step * colStep;

        if (!isValid(newRow, newCol) || board[newRow][newCol] !== player) {
            break;
        }

        ++count;
    }

    for (let step = 1; step < 4; ++step) {
        const newRow = row - step * rowStep;
        const newCol = col - step * colStep;

        if (!isValid(newRow, newCol) || board[newRow][newCol] !== player) {
            break;
        }

        ++count;
    }

    return count >= 4;
}

function isValid(row, col) {
    return row >= 0 && row < rows && col >= 0 && col < columns;
}

function setWinner(i, j) {
    let winner = document.getElementById("winner");
    if (board[i][j] == playerRed) {
        winner.innerText = "Red Wins";             
    } else {
        winner.innerText = "Yellow Wins";
    }
    gameOver = true;
}
