// DOM elements
const info = document.querySelector(`#info`);
const status = document.querySelector(`#status`);
const cells = document.querySelectorAll(`.cell`);

// init game
let endGame = false;
let currentPlayer = `X`;
info.innerHTML = `C'est à ${currentPlayer} de jouer.`;
status.innerHTML = `Partie en attente.`;
const winningCompositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let game = [``, ``, ``, ``, ``, ``, ``, ``, ``];

// listen click on cell
cells.forEach((cell) => cell.addEventListener(`click`, onPlay));

function onPlay(event) {
  const cellCurrent = event.target;
  const cellIndex = cellCurrent.getAttribute(`data-index`);

  // prevent multiple clicks on a cell
  if (game[cellIndex] || endGame) return;

  // complete game and add symbol in DOM
  game[cellIndex] = currentPlayer;
  cellCurrent.innerHTML = currentPlayer;
  status.innerHTML = `Partie commencée.`;

  // after each round
  checkingResults();
}

function checkingResults() {
  let currentGame = true;

  for (let index = 0; index < winningCompositions.length; index++) {
    const winningComposition = winningCompositions[index];

    // recover the three combination boxes
    let firstItem = game[winningComposition[0]];
    let secondItem = game[winningComposition[1]];
    let thirdItem = game[winningComposition[2]];

    // if the game is running
    if (!firstItem || !secondItem || !thirdItem) continue;

    // if the game is won
    if (firstItem === secondItem && secondItem === thirdItem) {
      currentGame = false;
      info.innerHTML = `${currentPlayer} remporte la partie.`;
      break;
    }

    //if the game is null
    if (!game.includes(``)) {
      info.innerHTML = `Match null.`;
      currentGame = false;
    }
  }

  // game finished
  if (!currentGame) {
    status.innerHTML = `Partie terminée.`;
    endGame = true;
    return;
  }

  // if the game continue
  playerChange();
}

function playerChange() {
  currentPlayer = currentPlayer === `X` ? `O` : `X`;
  info.innerHTML = `C'est à ${currentPlayer} de jouer.`;
}
