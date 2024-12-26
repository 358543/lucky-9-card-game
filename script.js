const playerVsPlayerBtn = document.getElementById('player-vs-player');
const playerVsComputerBtn = document.getElementById('player-vs-computer');
const drawCardBtn = document.getElementById('draw-card');
const hitBtn = document.getElementById('hit');
const goodCardBtn = document.getElementById('good-card');
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
  { cards: [], score: 0, hasHit: false },
  { cards: [], score: 0, hasHit: false }
];

function startGame(selectedMode) {
  mode = selectedMode;
  modeSelection.classList.add('hidden');
  gameBoard.classList.remove('hidden');
  resetGame();
}

function drawInitialCards() {
  const currentPlayerData = players[currentPlayer - 1];

  if (currentPlayerData.cards.length > 0) return; // Prevent drawing again

  for (let i = 0; i < 2; i++) {
    drawCard();
  }

  drawCardBtn.classList.add('hidden');
  hitBtn.classList.remove('hidden');
  goodCardBtn.classList.remove('hidden');
}

function drawCard() {
  const cardValue = Math.floor(Math.random() * 10) + 1;
  const currentPlayerData = players[currentPlayer - 1];

  if (currentPlayerData.cards.length >= 3) return; // Max 3 cards

  currentPlayerData.cards.push(cardValue);

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
  const currentPlayerData = players[currentPlayer - 1];
  currentPlayerData.score = currentPlayerData.cards.reduce((sum, card) => sum + card, 0) % 10;

  playerScoreElement.textContent = `Score: ${currentPlayerData.score}`;
}

function hit() {
  const currentPlayerData = players[currentPlayer - 1];

  if (currentPlayerData.hasHit) {
    resultDiv.textContent = `Player ${currentPlayer} has already hit!`;
    return;
  }

  drawCard();
  currentPlayerData.hasHit = true;

  hitBtn.classList.add('hidden');
}

function goodCard() {
  hitBtn.classList.add('hidden');
  goodCardBtn.classList.add('hidden');
  endTurnBtn.classList.remove('hidden');
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
  while (players[1].cards.length < 3 && players[1].score < 7) {
    drawCard();
  }
  determineWinner();
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
  hitBtn.disabled = true;
  goodCardBtn.disabled = true;
}

function resetGame() {
  players = [
    { cards: [], score: 0, hasHit: false },
    { cards: [], score: 0, hasHit: false }
  ];
  currentPlayer = 1;
  currentPlayerElement.textContent = 'Current Turn: Player 1';
  playerCardsDiv.innerHTML = '';
  playerScoreElement.textContent = 'Score: 0';
  resultDiv.textContent = '';
  drawCardBtn.classList.remove('hidden');
  hitBtn.classList.add('hidden');
  goodCardBtn.classList.add('hidden');
  endTurnBtn.classList.add('hidden');
}

function updateUIForNewTurn() {
  playerCardsDiv.innerHTML = '';
  playerScoreElement.textContent = 'Score: 0';
}

playerVsPlayerBtn.addEventListener('click', () => startGame('pvp'));
playerVsComputerBtn.addEventListener('click', () => startGame('pvc'));
drawCardBtn.addEventListener('click', drawInitialCards);
hitBtn.addEventListener('click', hit);
goodCardBtn.addEventListener('click', goodCard);
endTurnBtn.addEventListener('click', endTurn);
resetGameBtn.addEventListener('click', resetGame);
      
