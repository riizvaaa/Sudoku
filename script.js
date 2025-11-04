const grid = document.getElementById('grid');
const solveBtn = document.getElementById('solve-btn');
const newGameBtn = document.getElementById('new-game-btn');
const timerElement = document.getElementById('timer');

let puzzle = [];
let timerInterval;
let seconds = 0;
let minutes = 0;

function formatTime() {
    const f_seconds = seconds < 10 ? '0' + seconds : seconds;
    const f_minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${f_minutes}:${f_seconds}`;
}

function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        timerElement.textContent = formatTime();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    stopTimer();
    seconds = 0;
    minutes = 0;
    timerElement.textContent = formatTime();
}

function isValid(board, row, col, k) {
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(col / 3) + i % 3;
        if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
            return false;
        }
    }
    return true;
}

function solveSudoku(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] == 0) {
                for (let k = 1; k <= 9; k++) {
                    if (isValid(board, i, j, k)) {
                        board[i][j] = k;
                        if (solveSudoku(board)) {
                            return true;
                        } else {
                            board[i][j] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function generatePuzzle() {
    // Create an empty board
    let board = Array(9).fill(0).map(() => Array(9).fill(0));

    // Fill the diagonal boxes
    for (let i = 0; i < 9; i = i + 3) {
        fillBox(board, i, i);
    }

    // Fill the remaining cells
    solveSudoku(board);

    // Remove some cells to create the puzzle
    let puzzle = [];
    for (let i = 0; i < 9; i++) {
        puzzle[i] = [...board[i]];
    }

    let empties = 40;
    while (empties > 0) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        if (puzzle[row][col] != 0) {
            puzzle[row][col] = 0;
            empties--;
        }
    }

    return puzzle;
}

function fillBox(board, row, col) {
    let num;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            do {
                num = Math.floor(Math.random() * 9) + 1;
            } while (!isValid(board, row + i, col + j, num));
            board[row + i][col + j] = num;
        }
    }
}

function renderPuzzle() {
    grid.innerHTML = '';
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (puzzle[row][col] !== 0) {
                cell.textContent = puzzle[row][col];
                cell.classList.add('fixed');
            } else {
                const input = document.createElement('input');
                input.type = 'number';
                input.min = 1;
                input.max = 9;
                input.onchange = (e) => {
                    puzzle[row][col] = parseInt(e.target.value) || 0;
                };
                cell.appendChild(input);
            }
            grid.appendChild(cell);
        }
    }
}

function solve() {
    solveSudoku(puzzle);
    renderPuzzle();
    stopTimer();
}

function newGame() {
    puzzle = generatePuzzle();
    renderPuzzle();
    resetTimer();
    startTimer();
}

solveBtn.addEventListener('click', solve);
newGameBtn.addEventListener('click', newGame);

newGame();