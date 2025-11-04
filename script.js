const grid = document.getElementById('grid');
const solveBtn = document.getElementById('solve-btn');
const newGameBtn = document.getElementById('new-game-btn');

let puzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

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
    // Simple solver - to be implemented
    alert('Solving...');
}

function newGame() {
    // New game - to be implemented
    alert('New game...');
}

solveBtn.addEventListener('click', solve);
newGameBtn.addEventListener('click', newGame);

renderPuzzle();
