//EVIL - 20
const CLUES = 23;
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

const removeNumber = (grid, clues, targetClues) => {
  const remainingClues = grid.flat().filter((num) => num !== 0).length;
  if (remainingClues == targetClues) return true;

  let nonEmptyCells = [];
  for (var row = 0; row < PUZZLE_SIZE; row++)
    for (var col = 0; col < PUZZLE_SIZE; col++)
      if (grid[row][col] !== 0) nonEmptyCells.push([row, col]);

  nonEmptyCells = nonEmptyCells
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  for (const [row, col] of nonEmptyCells) {
    const backup = grid[row][col];
    grid[row][col] = 0;

    if (checkSolution(grid))
      if (removeNumber(grid, clues - 1, targetClues)) return true;

    grid[row][col] = backup;
  }

  return false;
};

const generateSudoku = () => {
  const solution = Array.from({ length: 9 }, () => Array(9).fill(0));

  fillGrid(solution);

  const puzzle = JSON.parse(JSON.stringify(solution));

  removeNumber(puzzle, 81, CLUES);

  return [solution, puzzle];
};

const displayGrid = (grid) => {
  grid.forEach((row) => {
    console.log(row.map((cell) => (cell === 0 ? "." : cell)).join(" "));
  });
};

const [solution, puzzle] = generateSudoku();
displayGrid(solution);
displayGrid(puzzle);
