var board;
var playerO = "⭕";
var playerX = "❌";
var currPlayer = playerO;
var countClick = 0;
var gameOver = false;

window.onload = function () {
  setGame();
};

function setGame() {
  board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.addEventListener("click", setTile);
      document.getElementById("table").append(tile);
    }
  }
}

function setTile() {
  if (gameOver) {
    return;
  }

  let coords = this.id.split("-");

  if (board[coords[0]][coords[1]] == " ") {
    // contagem para velha
    countClick += 1;

    // JS
    board[coords[0]][coords[1]] = currPlayer;

    // html
    this.innerHTML = currPlayer;

    // Troca de player
    if (currPlayer == playerO) {
      currPlayer = playerX;
    } else {
      currPlayer = playerO;
    }

    checkWinner();
  }
}

function checkWinner() {
  // Horizontais
  for (let r = 0; r < 3; r++) {
    if (
      (board[r][0] == board[r][1]) &
      (board[r][1] == board[r][2]) &
      (board[r][0] != " ")
    ) {
      for (let c = 0; c < 3; c++) {
        let tile = document.getElementById(r.toString() + "-" + c.toString());
        tile.classList.add("win");
      }

      result();
      return;
    }
  }

  // Verticais
  for (let c = 0; c < 3; c++) {
    if (
      (board[0][c] == board[1][c]) &
      (board[1][c] == board[2][c]) &
      (board[0][c] != " ")
    ) {
      for (let r = 0; r < 3; r++) {
        let tile = document.getElementById(r.toString() + "-" + c.toString());
        tile.classList.add("win");
      }

      result();
      return;
    }
  }

  // Diagonais
  if (
    (board[0][0] == board[1][1]) &
    (board[1][1] == board[2][2]) &
    (board[0][0] != " ")
  ) {
    for (let i = 0; i < 3; i++) {
      let tile = document.getElementById(i.toString() + "-" + i.toString());
      tile.classList.add("win");
    }

    result();
    return;
  }

  if (
    (board[0][2] == board[1][1]) &
    (board[1][1] == board[2][0]) &
    (board[0][2] != " ")
  ) {
    let tile = document.getElementById("0-2");
    tile.classList.add("win");
    tile = document.getElementById("1-1");
    tile.classList.add("win");
    tile = document.getElementById("2-0");
    tile.classList.add("win");

    result();
    return;
  }

  //   Velha
  console.log(countClick);
  if (countClick >= 9) {
    // html
    let result = document.getElementById("result");
    result.innerHTML = "Deu velha!";
    // js
    gameOver = true;
    return;
  }
}

function result() {
  gameOver = true;

  if (currPlayer == playerO) {
    let winner = document.getElementById("vencedor");
    winner.innerHTML = playerX;
  } else {
    let winner = document.getElementById("vencedor");
    winner.innerHTML = playerO;
  }

  let result = document.getElementById("result");
  result.innerHTML = "Ganhou!";
}

function reset() {
  location.reload();
}
