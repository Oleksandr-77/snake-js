// const gameContainer = document.getElementById("game-container");
// const snakeElement = document.getElementById("snake");
// const foodElement = document.getElementById("food");

// let snake = [{ x: 10, y: 10 }];
// let food = getRandomPosition();
// let direction = { x: 0, y: 0 };
// let intervalTime = 100;
// let interval = setInterval(moveSnake, intervalTime);

// document.addEventListener("keydown", changeDirection);

// function moveSnake() {
//   snake.unshift({ x: snake[0].x + direction.x, y: snake[0].y + direction.y });

//   if (snake[0].x === food.x && snake[0].y === food.y) {
//     eatFood();
//   } else {
//     snake.pop();
//   }

//   render();
// }

// function render() {
//   while (gameContainer.firstChild) {
//     gameContainer.removeChild(gameContainer.firstChild);
//   }

//   snake.forEach((segment) => {
//     const snakePart = document.createElement("div");
//     snakePart.style.gridRowStart = segment.y;
//     snakePart.style.gridColumnStart = segment.x;
//     snakePart.classList.add("snake");
//     gameContainer.appendChild(snakePart);
//   });

//   const foodItem = document.createElement("div");
//   foodItem.style.gridRowStart = food.y;
//   foodItem.style.gridColumnStart = food.x;
//   foodItem.classList.add("food");
//   gameContainer.appendChild(foodItem);
// }

// function getRandomPosition() {
//   let x = Math.floor(Math.random() * 20) + 1;
//   let y = Math.floor(Math.random() * 20) + 1;
//   return { x, y };
// }

// function eatFood() {
//   food = getRandomPosition();
// }

// function changeDirection(event) {
//   switch (event.key) {
//     case "ArrowUp":
//       if (direction.y !== 1) {
//         direction = { x: 0, y: -1 };
//       }
//       break;
//     case "ArrowDown":
//       if (direction.y !== -1) {
//         direction = { x: 0, y: 1 };
//       }
//       break;
//     case "ArrowLeft":
//       if (direction.x !== 1) {
//         direction = { x: -1, y: 0 };
//       }
//       break;
//     case "ArrowRight":
//       if (direction.x !== -1) {
//         direction = { x: 1, y: 0 };
//       }
//       break;
//   }
// }

const gameContainer = document.getElementById("game-container");
let snake = [{ x: 10, y: 10 }];
let food = getRandomPosition();
let direction = { x: 0, y: 0 };
let intervalTime = 100;
let interval;

document.addEventListener("keydown", changeDirection);

window.onload = function () {
  startGame();
};

function startGame() {
  interval = setInterval(moveSnake, intervalTime);
}

function moveSnake() {
  snake.unshift({ x: snake[0].x + direction.x, y: snake[0].y + direction.y });

  if (snake[0].x === food.x && snake[0].y === food.y) {
    eatFood();
  } else {
    snake.pop();
  }

  checkCollision();
  render();
}

function render() {
  while (gameContainer.firstChild) {
    gameContainer.removeChild(gameContainer.firstChild);
  }

  snake.forEach((segment) => {
    const snakePart = document.createElement("div");
    snakePart.style.gridRowStart = segment.y;
    snakePart.style.gridColumnStart = segment.x;
    snakePart.classList.add("snake");
    gameContainer.appendChild(snakePart);
  });

  const foodItem = document.createElement("div");
  foodItem.style.gridRowStart = food.y;
  foodItem.style.gridColumnStart = food.x;
  foodItem.classList.add("food");
  gameContainer.appendChild(foodItem);
}

function getRandomPosition() {
  let x = Math.floor(Math.random() * 20) + 1;
  let y = Math.floor(Math.random() * 20) + 1;
  return { x, y };
}

function eatFood() {
  food = getRandomPosition();
}

function changeDirection(event) {
  switch (event.key) {
    case "ArrowUp":
      if (direction.y !== 1) {
        direction = { x: 0, y: -1 };
      }
      break;
    case "ArrowDown":
      if (direction.y !== -1) {
        direction = { x: 0, y: 1 };
      }
      break;
    case "ArrowLeft":
      if (direction.x !== 1) {
        direction = { x: -1, y: 0 };
      }
      break;
    case "ArrowRight":
      if (direction.x !== -1) {
        direction = { x: 1, y: 0 };
      }
      break;
  }
}

function checkCollision() {
  if (snake[0].x < 1 || snake[0].x > 20 || snake[0].y < 1 || snake[0].y > 20) {
    gameOver();
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      gameOver();
    }
  }
}

function gameOver() {
  clearInterval(interval);
  alert("Game Over! Your score: " + (snake.length - 1));
}
