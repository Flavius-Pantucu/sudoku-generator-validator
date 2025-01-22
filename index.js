const CLUES = 17;
const SQUARE_SIZE = 3;
const PUZZLE_SIZE = 9;
const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const isValid = (grid, row, col, num) => {
  if (grid[row].includes(num)) return false;

  for (var i = 0; i < PUZZLE_SIZE; i++) if (grid[i][col] === num) return false;

  const sqrRow = Math.floor(row / SQUARE_SIZE) * SQUARE_SIZE;
  const sqrCol = Math.floor(col / SQUARE_SIZE) * SQUARE_SIZE;
  for (var i = 0; i < SQUARE_SIZE; i++)
    for (var j = 0; j < SQUARE_SIZE; j++)
      if (grid[sqrRow + i][sqrCol + j] === num) return false;

  return true;
};

const fillGrid = (grid) => {
  for (var row = 0; row < PUZZLE_SIZE; row++) {
    for (var col = 0; col < PUZZLE_SIZE; col++) {
      if (grid[row][col] === 0) {
        var randomNums = NUMBERS.sort(() => Math.random() - 0.5);

        for (num of randomNums) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            if (fillGrid(grid)) return true;
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
};

const checkSolution = (grid) => {
  var solutionCount = 0;

  const solvePuzzle = (grid) => {
    for (var row = 0; row < PUZZLE_SIZE; row++) {
      for (var col = 0; col < PUZZLE_SIZE; col++) {
        if (grid[row][col] === 0) {
          for (num of NUMBERS) {
            if (isValid(grid, row, col, num)) {
              grid[row][col] = num;
              solvePuzzle(grid);
              grid[row][col] = 0;
            }
          }
          return;
        }
      }
    }
    solutionCount++;
  };

  solvePuzzle(grid);

  return solutionCount === 1;
};

const removeNumbers = (solution, clues) => {
  const grid = JSON.parse(JSON.stringify(solution));
  const cells = [];
  for (var i = 0; i < PUZZLE_SIZE; i++)
    for (var j = 0; j < PUZZLE_SIZE; j++) cells.push([i, j]);

  cells.sort(() => Math.random() - 0.5);

  while (cells.length > clues) {
    const [row, col] = cells.pop();
    const num = grid[row][col];
    grid[row][col] = 0;

    if (!checkSolution(grid)) grid[row][col] = num;
  }

  return grid;
};

const generateSudoku = () => {
  const grid = Array.from({ length: 9 }, () => Array(9).fill(0));

  fillGrid(grid);

  return grid;
};

const displayGrid = (grid) => {
  grid.forEach((row) => {
    console.log(row.map((cell) => (cell === 0 ? "." : cell)).join(" "));
  });
};

const solution = generateSudoku();
const puzzle = removeNumbers(solution, CLUES);
displayGrid(solution);
displayGrid(puzzle);
