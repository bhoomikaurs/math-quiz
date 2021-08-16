const operators = ['X', '+', '-'];
let player = {
  val1: new Number(),
  val2: new Number(),
  operator: new String(),
  answer: new Number(),
  score: 0,
  mistake: 0,
};
function generateQuestion() {
  player.val1 = Math.floor(Math.random() * 9 + 1.5);
  player.val2 = Math.floor(Math.random() * 9 + 1.5);
  player.operator = operators[Math.floor(Math.random() * 2 + 0.5)];
  if (player.operator == 'X') {
    player.answer = player.val1 * player.val2;
  } else if (player.operator == '+') {
    player.answer = player.val1 + player.val2;
  } else {
    player.answer = player.val1 - player.val2;
  }
  displayQuestion();
}
function displayQuestion() {
  const question = document.querySelector('.question');
  question.innerHTML = `${player.val1} ${player.operator} ${player.val2}`;
}
function checkCorrect(answer) {
  return answer == player.answer;
}
function handelWin() {
  player.score++;
  navigator.vibrate(20)
  generateQuestion();
  if (player.score >= 10) {
    player.score = 0;
    alert('You won')
  }
  const scoreBox = document.querySelector('.score');
  scoreBox.innerHTML = player.score;
  const body = document.querySelector('body');
  body.style.backgroundColor = 'var(--default)';
  const fill = document.querySelector('.fill');
  fill.style.width = `${
    player.score * document.querySelector('.fillempty').offsetWidth
  }px`;
}
function handelLoss() {
  player.mistake++;
  navigator.vibrate([40,10,40])
  if (player.mistake >= 3) {
    player.mistake = 0;
    player.score = 0;
    document.querySelector('.fill').style.width = '0px';
    const body = document.querySelector('body');
  body.style.backgroundColor = 'var(--default)';
  }
  const mistakeBox = document.querySelector('.mistake');
  mistakeBox.innerHTML = player.mistake;
  const body = document.querySelector('body');
  body.style.backgroundColor = 'var(--red)';
  const container = document.querySelector('.container');
  container.classList.add('vibrate');
  setTimeout(() => {
    const container = document.querySelector('.container');
    container.classList.remove('vibrate');
  }, 1000);
}

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const answerBox = document.querySelector('#answer-box');
  const answer = answerBox.value;
  answerBox.value = '';
  if (answer != '') {
    if (checkCorrect(parseInt(answer))) {
      handelWin();
    } else {
      handelLoss();
    }
  }
});

generateQuestion();
