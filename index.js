class Difficulty {
  constructor(type, clues, bound, sequence) {
    this.type = type;
    this.clues = clues;
    this.bound = bound;
    this.sequence = this.sequence;
  }
}

var board;

var difficulty = [
  new Difficulty("easy", 45, 5, "random"),
  new Difficulty("medium", 40, 4, "random"),
  new Difficulty("hard", 35, 3, "jumping"),
  new Difficulty("extreme", 30, 2, "wanderingS"),
  new Difficulty("evil", 25, 0, "LRthenTB"),
];

const createBoard = () => {
  console.log("creating board...");

  board = new Array(9);
  for (var i = 0; i < 9; i++) board[i] = new Array(9);
};

const fillBoard = () => {
  console.log("filling board...");

  board[0] = [6, 4, 3, 5, 1, 7, 9, 2, 8];
  board[1] = [8, 1, 5, 3, 2, 9, 7, 4, 6];
  board[2] = [2, 9, 7, 8, 6, 4, 3, 1, 5];
  board[3] = [9, 2, 8, 1, 7, 5, 6, 3, 4];
  board[4] = [4, 7, 1, 6, 3, 2, 5, 8, 9];
  board[5] = [5, 3, 6, 9, 4, 8, 1, 7, 2];
  board[6] = [7, 5, 9, 4, 8, 3, 2, 6, 1];
  board[7] = [3, 6, 4, 2, 5, 1, 8, 9, 7];
  board[8] = [1, 8, 2, 7, 9, 6, 4, 5, 3];
};

const exchangeDigits = () => {
  var val1 = Math.floor(Math.random() * 9) + 1;
  var val2 = Math.floor(Math.random() * 9) + 1;
  if (val1 == val2) return;
  for (var row = 0; row < 9; row++) {
    for (var col = 0; col < 9; col++) {
      if (board[row][col] == val1) {
        board[row][col] = val2;
        continue;
      }
      if (board[row][col] == val2) {
        board[row][col] = val1;
        continue;
      }
    }
  }
};

const exchangeColumns = () => {
  var colBlock = Math.floor(Math.random() * 3);
  var col1 = Math.floor(Math.random() * 3);
  var col2 = Math.floor(Math.random() * 3);
  if (col1 == col2) return;
  for (var i = 0; i < 9; i++) {
    var aux = board[i][3 * colBlock + col1];
    board[i][3 * colBlock + col1] = board[i][3 * colBlock + col2];
    board[i][3 * colBlock + col2] = aux;
  }
};

const exchangeRows = () => {
  var rowBlock = Math.floor(Math.random() * 3);
  var row1 = Math.floor(Math.random() * 3);
  var row2 = Math.floor(Math.random() * 3);
  if (row1 == row2) return;
  for (var i = 0; i < 9; i++) {
    var aux = board[3 * rowBlock + row1][i];
    board[3 * rowBlock + row1][i] = board[3 * rowBlock + row2][i];
    board[3 * rowBlock + row2][i] = aux;
  }
};

const exchangeColBlocks = () => {
  var block1 = Math.floor(Math.random() * 3);
  var block2 = Math.floor(Math.random() * 3);
  if (block1 === block2) return;
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 3; j++) {
      var aux = board[i][3 * block1 + j];
      board[i][3 * block1 + j] = board[i][3 * block2 + j];
      board[i][3 * block2 + j] = aux;
    }
  }
};

const exchangeRowBlocks = () => {
  var block1 = Math.floor(Math.random() * 3);
  var block2 = Math.floor(Math.random() * 3);
  if (block1 === block2) return;
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 3; j++) {
      var aux = board[3 * block1 + j][i];
      board[3 * block1 + j][i] = board[3 * block2 + j][i];
      board[3 * block2 + j][i] = aux;
    }
  }
};

const gridRolling = () => {
  for (var i = 0; i < 5; i++) {
    for (var j = i; j < 8 - i; j++) {
      var aux = board[i][j];
      board[i][j] = board[8 - j][i];
      board[8 - j][i] = board[8 - i][8 - j];
      board[8 - i][8 - j] = board[j][8 - i];
      board[j][8 - i] = aux;
    }
  }
};

const shuffleBoard = (shuffles) => {
  console.log("shuffling board...");

  for (var i = 0; i < shuffles; i++) {
    exchangeDigits();
    exchangeColumns();
    exchangeRows();
    exchangeColBlocks();
    exchangeRowBlocks();
    gridRolling();
  }
};

const checkBoundaries = (bound) => {
  if (bound == 0) return true;

  var digits = 0;

  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) if (board[i][j] != ".") digits++;

    if (digits < bound) return false;
    digits = 0;
  }

  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) if (board[j][i] != ".") digits++;

    if (digits < bound) return false;
    digits = 0;
  }

  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 3; j++)
      for (var k = 0; k < 3; k++)
        if (board[j + 3 * Math.floor(i / 3)][k + 3 * (i % 3)] != ".") digits++;

    if (digits < bound) return false;
    digits = 0;
  }

  return true;
};

const removeClue = (clues, totalClues, bound) => {
  while (clues != totalClues) {
    var row = Math.floor(Math.random() * 9);
    var col = Math.floor(Math.random() * 9);

    const prevValue = board[row][col];
    board[row][col] = ".";

    if (checkBoundaries(bound) == true) {
      totalClues--;
      removeClue(clues, totalClues, bound);
    } else {
      board[row][col] = prevValue;
      return;
    }
  }
};

const removeClues = () => {
  const randomDifficulty = Math.floor(Math.random() * 2);
  const clues = difficulty[randomDifficulty].clues;
  const bound = difficulty[randomDifficulty].bound;

  var totalClues = 81;

  switch (randomDifficulty) {
    case 0:
      removeClue(clues, totalClues, bound);
      break;
    case 1:
      removeClue(clues, totalClues, bound);
      break;
  }
};

const getPossibleValues = (i, j, fakeBoard) => {
  if (fakeBoard[i][j] != ".") return [];
  var values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (var k = 0; k < 9; k++) {
    if (values.includes(fakeBoard[k][j])) {
      const index = values.indexOf(fakeBoard[k][j]);
      values.splice(index, 1);
    }
  }
  for (var k = 0; k < 9; k++) {
    if (values.includes(fakeBoard[i][k])) {
      const index = values.indexOf(fakeBoard[i][k]);
      values.splice(index, 1);
    }
  }
  for (var k = 0; k < 3; k++) {
    for (var l = 0; l < 3; l++) {
      if (
        values.includes(
          fakeBoard[Math.floor(i / 3) * 3 + k][Math.floor(j / 3) * 3 + l]
        )
      ) {
        const index = values.indexOf(fakeBoard[k][l]);
        values.splice(index, 1);
      }
    }
  }
  return values;
};

const copyBoard = (init) => {
  var copy = [];
  for (var i = 0; i < init.length; i++) {
    var square = [];
    for (var j = 0; j < init[i].length; j++) {
      square.push(init[i][j]);
    }
    copy.push(square);
  }
  return copy;
};

const bruteForceSolutions = (i, fakeBoard, solutions) => {
  if (i == 81) {
    printBoard(fakeBoard);
    solutions++;
    return;
  }
  const row = Math.floor(i / 9);
  const col = i % 9;

  if (fakeBoard[row][col] != ".") {
    bruteForceSolutions(i + 1, copyBoard(fakeBoard), solutions);
    return;
  }

  const possibleValues = getPossibleValues(row, col, fakeBoard);
  if (possibleValues.length == 0) return;
  for (var value in possibleValues) {
    fakeBoard[row][col] = value;
    bruteForceSolutions(i + 1, copyBoard(fakeBoard), solutions);
  }
  return;
};

const checkSolutions = () => {
  var solutions = 0;

  bruteForceSolutions(0, copyBoard(board), solutions);

  console.log(solutions);
};

const printBoard = (grid) => {
  console.log("printing board...");

  for (var i = 0; i < 9; i++) console.log(...grid[i]);
};

const toString = () => {
  var string = "";
  for (var i = 0; i < 9; i++) for (var j = 0; j < 9; j++) string += board[i][j];
  console.log(string);
};

const main = () => {
  createBoard();
  fillBoard();
  shuffleBoard(1000);
  removeClues();
  checkSolutions();
  printBoard(board);
};

main();
