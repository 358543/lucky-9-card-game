const drawCardBtn = document.getElementById('draw-card');
const resetGameBtn = document.getElementById('reset-game');
const playerCardsDiv = document.querySelector('#player-cards .cards');
const playerScoreElement = document.getElementById('player-score');
const resultDiv = document.getElementById('result');

let playerCards = [];
let playerScore = 0;

function drawCard() {
  if (playerCards.length >= 3) {
    resultDiv.textContent = "You can only draw up to 3 cards!";
    return;
  }

  const cardValue = Math.floor(Math.random() * 10) + 1;
  playerCards.push(cardValue);

  const cardDiv = document.createElement('div');
  cardDiv.className = 'card';
  cardDiv.textContent = cardValue;
  playerCardsDiv.appendChild(cardDiv);

  calculateScore();
}

function calculateScore() {
  playerScore = playerCards.reduce((sum, card) => sum + card, 0) % 10;
  playerScoreElement.textContent = `Score: ${playerScore}`;

  if (playerCards.length === 3) {
    if (playerScore === 9) {
      resultDiv.textContent = "Congratulations! You hit Lucky 9!";
    } else {
      resultDiv.textContent = `Game Over. Your score: ${playerScore}`;
    }
  }
}

function resetGame() {
  playerCards = [];
  playerScore = 0;
  playerCardsDiv.innerHTML = '';
  playerScoreElement.textContent = `Score: 0`;
  resultDiv.textContent = '';
}

drawCardBtn.addEventListener('click', drawCard);
resetGameBtn.addEventListener('click', resetGame);
                                   
