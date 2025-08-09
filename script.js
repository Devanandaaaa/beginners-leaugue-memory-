const colors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userPattern = [];
let level = 0;
let started = false;

const statusText = document.getElementById("status");
const startBtn = document.getElementById("start-btn");
const buttons = document.querySelectorAll(".btn");

startBtn.addEventListener("click", startGame);

function startGame() {
  level = 0;
  gamePattern = [];
  started = true;
  nextSequence();
}

function nextSequence() {
  userPattern = [];
  level++;
  statusText.textContent = `Level ${level}`;
  
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  gamePattern.push(randomColor);

  let delay = 0;
  gamePattern.forEach((color, index) => {
    setTimeout(() => {
      playAnimation(color);
    }, delay);
    delay += 600;
  });
}

function playAnimation(color) {
  const btn = document.querySelector(`.${color}`);
  btn.classList.add("active");
  setTimeout(() => btn.classList.remove("active"), 300);
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    if (!started) return;
    const color = btn.dataset.color;
    userPattern.push(color);
    playAnimation(color);
    checkAnswer(userPattern.length - 1);
  });
});

function checkAnswer(currentStep) {
  if (userPattern[currentStep] === gamePattern[currentStep]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    statusText.textContent = `Game Over! You reached Level ${level}. Press Start to try again.`;
    started = false;
  }
}
