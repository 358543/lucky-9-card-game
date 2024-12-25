const playerVsPlayerBtn = document.getElementById('player-vs-player');
const playerVsComputerBtn = document.getElementById('player-vs-computer');
const drawCardBtn = document.getElementById('draw-card');
const endTurnBtn = document.getElementById('end-turn');
const resetGameBtn = document.getElementById('reset-game');
const playerCardsDiv = document.querySelector('#player-cards .cards');
const playerScoreElement = document.getElementById('player-score');
const currentPlayerElement = document.getElementById('current-player');
const resultDiv = document.getElementById('result');
const gameBoard = document.getElementById('game-board');
const modeSelection = document.getElementById('mode-selection');

const cardImages = [
  'card1.png', 'card2.png', 'card3.png', 'card4.png', 'card5.png',
  'card6.png', 'card7.png', 'card8.png', 'card9.png', 'card10.png'
];

let mode = ''; // "pvp" or "pvc"
let currentPlayer = 1;
let players = [
  { cards: [], score: 0 },
  { cards: [], score: 0 }
];

function startGame(selectedMode) {
  mode = selectedMode;
  modeSelection.classList.add('hidden');
  gameBoard.classList.remove('hidden');
  resetGame();
}

function drawCard() {
  if (players[currentPlayer - 1].cards.length >= 3) {
    resultDiv.textContent = `Player ${currentPlayer}, you can only draw up to 3 cards!`;
    return;
  }

  const cardValue = Math.floor(Math.random() * 10) + 1;
  players[currentPlayer - 1].cards.push(cardValue);

  const cardDiv = document.createElement('div');
  cardDiv.className = 'card';

  const cardImg = document.createElement('img');
  cardImg.src = `images/${cardImages[cardValue - 1]}`;
  cardImg.alt = `Card ${cardValue}`;
  cardDiv.appendChild(cardImg);

  playerCardsDiv.appendChild(cardDiv);

  calculateScore();
}

function calculateScore() {
  players[currentPlayer - 1].score =
    players[currentPlayer - 1].cards.reduce((sum, card) => sum + card, 0) % 10;

  playerScoreElement.textContent = `Score: ${players[currentPlayer - 1].score}`;

  if (players[currentPlayer - 1].cards.length === 3) {
    endTurn();
  }
}

function endTurn() {
  if (currentPlayer === 1 && mode === 'pvc') {
    currentPlayer = 2;
    currentPlayerElement.textContent = "Current Turn: Computer";
    computerTurn();
  } else if (currentPlayer === 1) {
    currentPlayer = 2;
    currentPlayerElement.textContent = "Current Turn: Player 2";
    updateUIForNewTurn();
  } else {
    determineWinner();
  }
}

function computerTurn() {
  const delay = 1000; // 1 second delay for realism
  setTimeout(() => {
    while (players[1].cards.length < 3) {
      drawCard();
    }
    determineWinner();
  }, delay);
}

function determineWinner() {
  const player1Score = players[0].score;
  const player2Score = players[1].score;

  if (player1Score === player2Score) {
    resultDiv.textContent = 'It\'s a tie!';
  } else if (player1Score > player2Score) {
    resultDiv.textContent = 'Player 1 Wins!';
  } else {
    resultDiv.textContent = mode === 'pvp' ? 'Player 2 Wins!' : 'Computer Wins!';
  }
  drawCardBtn.disabled = true;
  endTurnBtn.disabled = true;
}

function resetGame() {
  players = [
    { cards: [], score: 0 },
    { cards: [], score: 0 }
  ];
  currentPlayer = 1;
  currentPlayerElement.textContent = 'Current Turn: Player 1';
  playerCardsDiv.innerHTML = '';
  playerScoreElement.textContent = 'Score: 0';
  resultDiv.textContent = '';
  drawCardBtn.disabled = false;
  endTurnBtn.disabled = false;
}

function updateUIForNewTurn() {
  playerCardsDiv.innerHTML = '';
  playerScoreElement.textContent = 'Score: 0';
}

playerVsPlayerBtn.addEventListener('click', () => startGame('pvp'));
playerVsComputerBtn.addEventListener('click', () => startGame('pvc'));
drawCardBtn.addEventListener('click', drawCard);
endTurnBtn.addEventListener('click', endTurn);
resetGameBtn.addEventListener('click', resetGame);
      
