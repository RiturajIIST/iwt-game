const gameContainer = document.getElementById("game");
const statusText = document.getElementById("status");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const closeButton = document.getElementById("close-modal");
const playAgainButton = document.getElementById("play-again");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function createGameGrid() {
  gameContainer.innerHTML = "";
  gameState.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.classList.add(
      "h-20", "w-20", "flex", "items-center", "justify-center", 
      "text-3xl", "font-bold", "cursor-pointer", "bg-green-500", 
      "hover:bg-green-400", "rounded-lg", "shadow-md"
    );
    cell.setAttribute("data-index", index);
    cell.addEventListener("click", handleCellClick);
    gameContainer.appendChild(cell);
  });
}

function handleCellClick(event) {
  const clickedCell = event.target;
  const cellIndex = clickedCell.getAttribute("data-index");

  if (gameState[cellIndex] !== "" || !gameActive) return;

  gameState[cellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  if (checkWin()) {
    showModal(`Player ${currentPlayer} wins!`);
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    showModal("It's a tie!");
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  return winConditions.some((condition) => {
    return condition.every((index) => gameState[index] === currentPlayer);
  });
}

function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  createGameGrid();
}

function showModal(message) {
  modalMessage.textContent = message;
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
}

closeButton.addEventListener("click", closeModal);
playAgainButton.addEventListener("click", () => {
  closeModal();
  resetGame();
});

createGameGrid();
statusText.textContent = `Player ${currentPlayer}'s turn`;
