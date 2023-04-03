class Difficulty {
  constructor(type = null, clues = null, bound = null, sequence = null) {
    this.type = type;
    this.clues = clues;
    this.bound = bound;
    this.sequence = this.sequence;
  }
}

class Puzzle {
  constructor(
    board = [],
    solution = [],
    difficulty = new Difficulty(),
    eligible = null
  ) {
    this.board = board;
    this.solution = solution;
    this.difficulty = difficulty;
    this.eligible = this.eligible;
    this.createPuzzle();
  }

  createBoard = () => {
    this.board = new Array(9);
    for (var i = 0; i < 9; i++) this.board[i] = new Array(9);
  };

  fillBoard = () => {
    this.board[0] = [6, 4, 3, 5, 1, 7, 9, 2, 8];
    this.board[1] = [8, 1, 5, 3, 2, 9, 7, 4, 6];
    this.board[2] = [2, 9, 7, 8, 6, 4, 3, 1, 5];
    this.board[3] = [9, 2, 8, 1, 7, 5, 6, 3, 4];
    this.board[4] = [4, 7, 1, 6, 3, 2, 5, 8, 9];
    this.board[5] = [5, 3, 6, 9, 4, 8, 1, 7, 2];
    this.board[6] = [7, 5, 9, 4, 8, 3, 2, 6, 1];
    this.board[7] = [3, 6, 4, 2, 5, 1, 8, 9, 7];
    this.board[8] = [1, 8, 2, 7, 9, 6, 4, 5, 3];
  };

  exchangeDigits = () => {
    var val1 = Math.floor(Math.random() * 9) + 1;
    var val2 = Math.floor(Math.random() * 9) + 1;
    if (val1 == val2) return;
    for (var row = 0; row < 9; row++) {
      for (var col = 0; col < 9; col++) {
        if (this.board[row][col] == val1) {
          this.board[row][col] = val2;
          continue;
        }
        if (this.board[row][col] == val2) {
          this.board[row][col] = val1;
          continue;
        }
      }
    }
  };

  exchangeColumns = () => {
    var colBlock = Math.floor(Math.random() * 3);
    var col1 = Math.floor(Math.random() * 3);
    var col2 = Math.floor(Math.random() * 3);
    if (col1 == col2) return;
    for (var i = 0; i < 9; i++) {
      var aux = this.board[i][3 * colBlock + col1];
      this.board[i][3 * colBlock + col1] = this.board[i][3 * colBlock + col2];
      this.board[i][3 * colBlock + col2] = aux;
    }
  };

  exchangeRows = () => {
    var rowBlock = Math.floor(Math.random() * 3);
    var row1 = Math.floor(Math.random() * 3);
    var row2 = Math.floor(Math.random() * 3);
    if (row1 == row2) return;
    for (var i = 0; i < 9; i++) {
      var aux = this.board[3 * rowBlock + row1][i];
      this.board[3 * rowBlock + row1][i] = this.board[3 * rowBlock + row2][i];
      this.board[3 * rowBlock + row2][i] = aux;
    }
  };

  exchangeColBlocks = () => {
    var block1 = Math.floor(Math.random() * 3);
    var block2 = Math.floor(Math.random() * 3);
    if (block1 === block2) return;
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 3; j++) {
        var aux = this.board[i][3 * block1 + j];
        this.board[i][3 * block1 + j] = this.board[i][3 * block2 + j];
        this.board[i][3 * block2 + j] = aux;
      }
    }
  };

  exchangeRowBlocks = () => {
    var block1 = Math.floor(Math.random() * 3);
    var block2 = Math.floor(Math.random() * 3);
    if (block1 === block2) return;
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 3; j++) {
        var aux = this.board[3 * block1 + j][i];
        this.board[3 * block1 + j][i] = this.board[3 * block2 + j][i];
        this.board[3 * block2 + j][i] = aux;
      }
    }
  };

  gridRolling = () => {
    for (var i = 0; i < 5; i++) {
      for (var j = i; j < 8 - i; j++) {
        var aux = this.board[i][j];
        this.board[i][j] = this.board[8 - j][i];
        this.board[8 - j][i] = this.board[8 - i][8 - j];
        this.board[8 - i][8 - j] = this.board[j][8 - i];
        this.board[j][8 - i] = aux;
      }
    }
  };

  shuffleBoard = (shuffles) => {
    for (var i = 0; i < shuffles; i++) {
      this.exchangeDigits();
      this.exchangeColumns();
      this.exchangeRows();
      this.exchangeColBlocks();
      this.exchangeRowBlocks();
      this.gridRolling();
    }
  };

  checkBoundaries = (bound) => {
    if (bound == 0) return true;

    var digits = 0;

    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) if (this.board[i][j] != ".") digits++;

      if (digits < bound) return false;
      digits = 0;
    }

    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) if (this.board[j][i] != ".") digits++;

      if (digits < bound) return false;
      digits = 0;
    }

    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 3; j++)
        for (var k = 0; k < 3; k++)
          if (this.board[j + 3 * Math.floor(i / 3)][k + 3 * (i % 3)] != ".")
            digits++;

      if (digits < bound) return false;
      digits = 0;
    }

    return true;
  };

  removeClue = (clues, totalClues, bound) => {
    while (clues != totalClues) {
      var row = Math.floor(Math.random() * 9);
      var col = Math.floor(Math.random() * 9);

      const prevValue = this.board[row][col];
      this.board[row][col] = ".";

      if (this.checkBoundaries(bound) == true) {
        totalClues--;
        this.removeClue(clues, totalClues, bound);
      } else {
        this.board[row][col] = prevValue;
        return;
      }
    }
  };

  removeClues = () => {
    const randomDifficulty = Math.floor(Math.random() * 2);
    const clues = difficulty[randomDifficulty].clues;
    const bound = difficulty[randomDifficulty].bound;
    this.difficulty = difficulty[randomDifficulty];

    var totalClues = 81;

    switch (randomDifficulty) {
      case 0:
        this.removeClue(clues, totalClues, bound);
        break;
      case 1:
        this.removeClue(clues, totalClues, bound);
        break;
    }
  };

  getPossibleValues = (i, j, _board) => {
    var values = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (var k = 0; k < 9; k++) {
      if (values.includes(_board[k][j])) {
        const index = values.indexOf(_board[k][j]);
        values.splice(index, 1);
      }
    }
    for (var k = 0; k < 9; k++) {
      if (values.includes(_board[i][k])) {
        const index = values.indexOf(_board[i][k]);
        values.splice(index, 1);
      }
    }
    for (var k = 0; k < 3; k++) {
      for (var l = 0; l < 3; l++) {
        if (
          values.includes(
            _board[Math.floor(i / 3) * 3 + k][Math.floor(j / 3) * 3 + l]
          )
        ) {
          const index = values.indexOf(
            _board[Math.floor(i / 3) * 3 + k][Math.floor(j / 3) * 3 + l]
          );
          values.splice(index, 1);
        }
      }
    }

    return values;
  };

  bruteForceSolutions = (i, _board, solutions) => {
    if (i == 81) solutions.count++;
    else {
      const row = Math.floor(i / 9);
      const col = i % 9;

      if (_board[row][col] != ".")
        this.bruteForceSolutions(i + 1, structuredClone(_board), solutions);
      else {
        const possibleValues = this.getPossibleValues(row, col, _board);
        if (possibleValues.length != 0) {
          for (var j = 0; j < possibleValues.length; j++) {
            _board[row][col] = possibleValues[j];
            this.bruteForceSolutions(i + 1, structuredClone(_board), solutions);
          }
        }
      }
    }
  };

  checkSolutions = () => {
    var solutions = { count: 0 };
    this.bruteForceSolutions(0, structuredClone(this.board), solutions);
    solutions.count != 1 ? (this.eligible = false) : (this.eligible = true);
  };

  printPuzzle = () => {
    this.eligible == false
      ? console.log("Puzzle admits many solutions.")
      : console.log("Puzzle admits only one solution.");
    console.log();
    console.log("Puzzle difficulty: " + this.difficulty.type);
    console.log();
    for (var i = 0; i < 9; i++) console.log(...this.solution[i]);
    console.log();
    for (var i = 0; i < 9; i++) console.log(...this.board[i]);
    console.log();
    var string = "";
    for (var i = 0; i < 9; i++)
      for (var j = 0; j < 9; j++) string += this.board[i][j];
    console.log(string);
  };

  createPuzzle() {
    this.createBoard();
    this.fillBoard();
    this.shuffleBoard(1000);
    this.solution = structuredClone(this.board);
    this.removeClues();
    this.checkSolutions();
  }
}

const difficulty = [
  new Difficulty("easy", 42, 4, "random"),
  new Difficulty("medium", 36, 3, "random"),
  new Difficulty("hard", 32, 2, "jumping"),
  new Difficulty("extreme", 28, 1, "wanderingS"),
  new Difficulty("evil", 24, 0, "LRthenTB"),
];

const main = () => {
  var puzzle = new Puzzle();
  while (puzzle.eligible == false) {
    puzzle = null;
    puzzle = new Puzzle();
  }
  puzzle.printPuzzle();
};

main();
