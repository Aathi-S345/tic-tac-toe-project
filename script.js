const buttons = document.querySelectorAll(".button");
const msg = document.querySelector("#msg");
const newGameBtn = document.querySelector("#newGameBtn");
const resetBtn = document.querySelector("#resetBtn");

let turnO = true;
let count = 0;
let gameEnded = false;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

resetBtn.disabled = true;

buttons.forEach(btn => btn.addEventListener("click", handleMove));
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", newGame);

function handleMove(e) {
  if (gameEnded) return;

  const btn = e.target;
  if (btn.textContent) return;

  btn.textContent = turnO ? "O" : "X";
  btn.disabled = true;
  turnO = !turnO;
  count++;

  checkWinner();
}

function checkWinner() {
  for (const [a,b,c] of winPatterns) {
    const v1 = buttons[a].textContent,
          v2 = buttons[b].textContent,
          v3 = buttons[c].textContent;

    if (v1 && v1 === v2 && v2 === v3) {
      endGame(`Congratulations, Player ${v1} wins!`);
      resetBtn.disabled = false;
      gameEnded = true;
      return true;
    }
  }

  if (count === 9) {
    endGame("Game ended in a draw!");
    resetBtn.disabled = false;
    gameEnded = true;
    return true;
  }

  return false;
}

function endGame(message) {
  msg.textContent = message;
  buttons.forEach(b => b.disabled = true);
}

function resetGame() {
  if (!gameEnded) return;

  turnO = true;
  count = 0;
  gameEnded = false;
  msg.textContent = "";

  buttons.forEach(b => {
    b.disabled = false;
    b.textContent = "";
  });

  resetBtn.disabled = true;
}

function newGame() {
  turnO = true;
  count = 0;
  gameEnded = false;
  msg.textContent = "";

  buttons.forEach(b => {
    b.disabled = false;
    b.textContent = "";
  });

  resetBtn.disabled = true;
}
