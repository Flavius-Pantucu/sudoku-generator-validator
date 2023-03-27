var board;
var difficulty = ["easy", "medium", "hard", "extreme", "evil"];

const createBoard = () => {
  board = new Array(9);
  for (var i = 0; i < 9; i++) board[i] = new Array(9);
};

const fillBoard = () => {
  for (var i = 0; i < 9; i++)
    for (var j = 0; j < 9; j++) board[i][j] = ((i + j) % 9) + 1;
};

const shuffleBoard = (rowShuffles, columnShuffles, valueShuffles, parts) => {
  for (var i = 0; i < parts; i++) {
    for (var j = 0; j < rowShuffles; j++) {
      var row1 = Math.floor(Math.random() * 9);
      var row2 = Math.floor(Math.random() * 9);
      for (var k = 0; k < 9; k++) {
        var aux = board[row1][k];
        board[row1][k] = board[row2][k];
        board[row2][k] = aux;
      }
    }
    for (var j = 0; j < columnShuffles; j++) {
      var col1 = Math.floor(Math.random() * 9);
      var col2 = Math.floor(Math.random() * 9);
      for (var k = 0; k < 9; k++) {
        var aux = board[k][col1];
        board[k][col1] = board[k][col2];
        board[k][col2] = aux;
      }
    }
    for (var j = 0; j < valueShuffles; j++) {
      var val1 = Math.floor(Math.random() * 9) + 1;
      var val2 = Math.floor(Math.random() * 9) + 1;
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
    }
  }
};

const printBoard = () => {
  for (var i = 0; i < 9; i++) console.log(...board[i]);
};

const main = () => {
  createBoard();
  fillBoard();
  shuffleBoard(500, 500, 500, 4);
  printBoard();
};

main();
