const ward = document.querySelector(".ward");
const displayMode = document.querySelector("#displayMode");

let lastKeyCode;
let intervalMove;
let timeRender = 1000;
let dataSnake;
let snakePositionCurrent;
let applePositionCurrent;
let modeGame = "A";
let isGameOver;

function innit() {
  ward.classList.remove("GameOver");
  isGameOver = false;
  clearInterval(intervalMove);
  ramdomApple();
  dataSnake = [];
  snakePositionCurrent = { i: 9, j: 9 };
  //   addDataInnit();
  dataSnake[0] = {
    i: snakePositionCurrent.i,
    j: snakePositionCurrent.j,
    lastI: snakePositionCurrent.i,
    lastJ: snakePositionCurrent.i,
    isHeader: true
  };
  render();
}

function snakeSatsItSelf() {
  //   for (let i = 0; i < dataSnake.length - 1; i++) {
  //     for (let j = i + 1; j < dataSnake.length; j++) {
  //       if (
  //         dataSnake[i].i === dataSnake[j].i &&
  //         dataSnake[i].j === dataSnake[j].j
  //       )
  //         return true;
  //     }
  //   }
  //   return false;
  let Ni = dataSnake[0].i;
  let Nj = dataSnake[0].j;

  for (let i = 1; i < dataSnake.length; i++) {
    if (dataSnake[i].i === Ni && dataSnake[i].j === Nj) return true;
  }
  return false;
}

function ramdomApple() {
  applePositionCurrent = {
    i: Math.floor(Math.random() * 20),
    j: Math.floor(Math.random() * 20)
  };
}

function snakeMove() {
  for (let i = 0; i < dataSnake.length; i++) {
    dataSnake[i].lastI = dataSnake[i].i;
    dataSnake[i].lastJ = dataSnake[i].j;
    if (i == 0) {
      dataSnake[i].i = snakePositionCurrent.i;
      dataSnake[i].j = snakePositionCurrent.j;
      changeModeGame;
    } else {
      dataSnake[i].i = dataSnake[i - 1].lastI;
      dataSnake[i].j = dataSnake[i - 1].lastJ;
    }
  }
  render();
}

function checkLocationSnake(i, j) {
  for (e of dataSnake) {
    if (e.i == i && e.j == j) {
      return e.isHeader;
    }
  }
  return "no";
}

function render() {
  ward.innerHTML = "";
  for (let i = 0; i < 20; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < 20; j++) {
      let backGround = document.createElement("div");
      let check = checkLocationSnake(i, j);
      backGround.classList.add("backGround");
      if (check !== "no") {
        if (check) backGround.classList.add("header-snake");
        else backGround.classList.add("snake-body");
      }
      if (
        i == applePositionCurrent.i &&
        j == applePositionCurrent.j &&
        !(
          snakePositionCurrent.i == applePositionCurrent.i &&
          snakePositionCurrent.j === applePositionCurrent.j
        )
      ) {
        backGround.classList.add("apple");
      }
      row.append(backGround);
    }
    ward.append(row);
  }
}

function eatApple() {
  //     let snakePositionCurrent = { i: 12, j: 9 };
  // let applePositionCurrent;
  if (
    snakePositionCurrent.i === applePositionCurrent.i &&
    snakePositionCurrent.j === applePositionCurrent.j
  ) {
    ramdomApple();
    addBody();
  }
}

function addBody() {
  dataSnake[dataSnake.length] = {
    i: dataSnake[dataSnake.length - 1].lastI,
    j: dataSnake[dataSnake.length - 1].lastJ,
    lastI: dataSnake[dataSnake.length - 1].lastI,
    lastJ: dataSnake[dataSnake.length - 1].lastJ,
    isHeader: false
  };
}

function lastKey(current) {
  if (current === 37 && lastKeyCode === 39) return false;
  if (current === 39 && lastKeyCode === 37) return false;
  if (current === 38 && lastKeyCode === 40) return false;
  if (current === 40 && lastKeyCode === 38) return false;
  lastKeyCode = current;

  return true;
}

function handleKyDown(keyCode) {
  if (isGameOver) return;
  if (!lastKey(keyCode)) return;
  clearInterval(intervalMove);
  switch (keyCode) {
    case 37:
      moveLeft();
      console.log("trái");
      break;
    case 39:
      moveRight();
      console.log("phải");
      break;
    case 38:
      moveUp();
      console.log("lên");
      break;
    case 40:
      moveDown();
      console.log("xuống");
      break;
  }
}
function gameOver() {
  isGameOver = true;
  ward.classList.add("GameOver");
  clearInterval(intervalMove);
}

function moveUp() {
  intervalMove = setInterval(() => {
    snakePositionCurrent.i--;
    snakeMove();
    eatApple();
    if (snakeSatsItSelf()) gameOver();
    if (snakePositionCurrent.i < 0)
      if (modeGame === "A") gameOver();
      else snakePositionCurrent.i = 20;
  }, timeRender);
}

function moveDown() {
  intervalMove = setInterval(() => {
    snakePositionCurrent.i++;
    snakeMove();
    eatApple();
    if (snakeSatsItSelf()) gameOver();
    if (snakePositionCurrent.i > 19)
      if (modeGame === "A") gameOver();
      else snakePositionCurrent.i = -1;
  }, timeRender);
}

function moveRight() {
  intervalMove = setInterval(() => {
    snakePositionCurrent.j++;
    snakeMove();
    eatApple();
    if (snakeSatsItSelf()) gameOver();
    if (snakePositionCurrent.j > 19)
      if (modeGame === "A") gameOver();
      else snakePositionCurrent.j = -1;
  }, timeRender);
}

function moveLeft() {
  intervalMove = setInterval(() => {
    snakePositionCurrent.j--;
    snakeMove();
    eatApple();
    if (snakeSatsItSelf()) gameOver();
    if (snakePositionCurrent.j < 0)
      if (modeGame === "A") gameOver();
      else snakePositionCurrent.j = 20;
  }, timeRender);
}

function changeModeGame(mode) {
  modeGame = mode;
  innit();
}

window.addEventListener("keydown", e => {
  handleKyDown(e.keyCode);
});

document.querySelectorAll("button").forEach(e =>
  e.addEventListener("click", e => {
    displayMode.textContent = "Mode " + e.target.dataset.mode;
    changeModeGame(e.target.dataset.mode);
  })
);

innit();
