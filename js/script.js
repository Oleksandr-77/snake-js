console.log("Скрипт загружен и готов к работе");

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const gameCountDisplay = document.getElementById("gameCount");

const box = 20;
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

let direction = null;
let food = {
  x: Math.floor(Math.random() * (canvas.width / box)) * box,
  y: Math.floor(Math.random() * (canvas.height / box)) * box,
};
let score = 0;
let gameCount = 0;
let gameInterval;

document.addEventListener("keydown", setDirection);
console.log("Event listener добавлен");

function setDirection(event) {
  console.log("Клавиша нажата:", event.keyCode);
  if (event.keyCode == 37 && direction !== "RIGHT") direction = "LEFT";
  else if (event.keyCode == 38 && direction !== "DOWN") direction = "UP";
  else if (event.keyCode == 39 && direction !== "LEFT") direction = "RIGHT";
  else if (event.keyCode == 40 && direction !== "UP") direction = "DOWN";
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  if (snakeX === food.x && snakeY === food.y) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    food = {
      x: Math.floor(Math.random() * (canvas.width / box)) * box,
      y: Math.floor(Math.random() * (canvas.height / box)) * box,
    };
  } else {
    snake.pop();
  }

  const newHead = {
    x: snakeX,
    y: snakeY,
  };

  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvas.width ||
    snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(gameInterval);
    gameOver();
  }

  snake.unshift(newHead);
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}

function gameOver() {
  ctx.fillStyle = "white";
  ctx.font = "50px Changa one";
  ctx.fillText("Game Over", canvas.width / 6.5, canvas.height / 2);
  gameCount++;
  gameCountDisplay.textContent = `Games: ${gameCount}`;

  setTimeout(() => {
    resetGame();
  }, 2000);
}

function resetGame() {
  snake = [];
  snake[0] = { x: 9 * box, y: 10 * box };
  direction = null;
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  food = {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box,
  };
  gameInterval = setInterval(draw, 100);
}

resetGame();
