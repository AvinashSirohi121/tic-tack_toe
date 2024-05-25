let base = document.querySelector(".tic_tack_toe");
let currentUser = "X";
let board = Array(3)
  .fill(null)
  .map(() => Array(3).fill(null)); // Initialize a 3x3 board
let text = document.querySelector(".winner");

function createBoard() {
  let rows = 3;
  for (let i = 0; i < rows; i++) {
    const row = document.createElement("div");
    row.className = "row";

    for (let j = 0; j < rows; j++) {
      const col = document.createElement("div");
      col.className = "cell";
      col.setAttribute("row", i);
      col.setAttribute("col", j);
      row.appendChild(col);
    }
    base.appendChild(row);
  }
}

base.addEventListener("click", function (e) {
  let curr = e.target;

  // Ensure the click is on a cell and the cell is not already filled
  if (curr.classList.contains("cell") && !curr.innerText) {
    curr.innerText = currentUser;
    curr.style.backgroundColor = currentUser === "X" ? "red" : "green";
    let row = parseInt(curr.getAttribute("row"));
    let col = parseInt(curr.getAttribute("col"));

    updateBoard(row, col, currentUser);

    setTimeout(() => {
      if (findWinner(row, col)) {
        text.innerText = `${currentUser} wins`;
        setTimeout(() => {
          resetBoard();
        }, 3000);
      } else if (isBoardFull()) {
        text.innerText = `It is a draw`;
        setTimeout(() => {
          resetBoard();
        }, 3000);
      } else {
        changeUser();
      }
    }, 100); // Delay the winner check slightly to allow the DOM to update
  }
});

function changeUser() {
  currentUser = currentUser === "X" ? "O" : "X";
}

function updateBoard(row, col, currentUser) {
  board[row][col] = currentUser;
  console.log("Board =>", board);
}

function findWinner(row, col) {
  // Check the row
  if (board[row].every((cell) => cell === currentUser)) return true;

  // Check the column
  if (board.every((row) => row[col] === currentUser)) return true;

  // Check the diagonals
  if (row === col && board.every((row, idx) => row[idx] === currentUser))
    return true;
  if (
    row + col === 2 &&
    board.every((row, idx) => row[2 - idx] === currentUser)
  )
    return true;

  return false;
}

function isBoardFull() {
  return board.every((row) => row.every((cell) => cell !== null));
}

function resetBoard() {
  board = Array(3)
    .fill(null)
    .map(() => Array(3).fill(null));
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.innerText = "";
    cell.style.backgroundColor = "white"; // Reset the background color to white
  });
  text.innerHTML = "";
}

createBoard();
