const ward = document.querySelector(".ward");
let currentArray;
let player;
let isEndGame;
let currenWin;
let currenN;

function innit(n = 3, m = 3) {
  currenWin = 0;
  currenN = 0;
  ward.classList.remove("game-Over");
  currentArray = [];
  player = "o";
  isEndGame = false;
  document.querySelectorAll(".table").forEach(e => {
    e.removeEventListener("click", handleClick);
    e.remove();
  });
  render(n, m);
}

function checkWiner(array) {
  let valueLast = "";
  let count = 0;
  let maxMach = 0;

  for (let i = 0; i < array.length; i++) {
    if (array[i]) {
      if (array[i] != valueLast) {
        valueLast = array[i];
        count = 1;
      } else {
        count++;
        if (count > maxMach) maxMach = count;
      }
    } else {
      count = 0;
      valueLast = "";
    }
  }
  console.log(count);
  return maxMach >= currenWin ? true : false;
}

function render(n = 3, m = 3) {
  currenWin = m;
  currenN = n;
  for (let i = 0; i < n; i++) {
    let divW = document.createElement("div");
    divW.classList.add("ward-table");
    for (let j = 0; j < n; j++) {
      let divT = document.createElement("div");
      divT.classList.add("table");
      divT.setAttribute(`data-i`, `${i}`);
      divT.setAttribute(`data-j`, `${j}`);
      divW.append(divT);
    }
    currentArray.push([]);
    ward.append(divW);
  }

  document
    .querySelectorAll(".table")
    .forEach(e => e.addEventListener("click", handleClick));
}

function handleClick() {
  if (this.textContent !== "") return;
  if (isEndGame) return;
  if (player) this.innerHTML = toggleGamer(player);
  currentArray[this.dataset.i][this.dataset.j] = player;
  if (endGame(this.dataset.i, this.dataset.j) || checkFull())
    ward.classList.add("game-Over");
}

function toggleGamer(is) {
  if (is == "x") player = "o";
  if (is == "o") player = "x";
  return player;
}

function endGame(i, j) {
  if (checkHight(j) || checkWidth(i) || checkXY1(i, j) || checkXY2(i, j)) {
    return (isEndGame = true);
  }
}

function checkHight(j) {
  let array = [];
  for (let i = 0; i < currenN; i++) {
    array.push(currentArray[i][j]);
  }
  return checkWiner(array);
}

function checkWidth(i) {
  let array = [];
  for (let j = 0; j < currenN; j++) {
    array.push(currentArray[i][j]);
  }
  return checkWiner(array);
}

function checkXY1(i, j) {
  while (i < currenN && j > 0) {
    i++;
    j--;
  }
  if (i >= currenN) return false;

  let array = [];
  while (i >= 0 && j < currenN) {
    array.push(currentArray[i][j]);
    i--;
    j++;
  }
  return checkWiner(array);
}

function checkXY2(i, j) {
  while (i < currenN - 1 && j < currenN - 1) {
    i++;
    j++;
  }
  console.log(i, j);
  let array = [];
  console.log(i, j);
  while (i >= 0 && j >= 0) {
    console.log(i, j, currentArray[i][j]);
    array.push(currentArray[i][j]);
    i--;
    j--;
  }
  console.log(array);
  return checkWiner(array);
}

function checkFull() {
  // let full = false;
  // if (
  //   currentArray[0].length == 9 ||
  //   currentArray[1].length == 9 ||
  //   currentArray[2].length == 9
  // ) {
  //   full = true;
  //   for (e of currentArray) {
  //     if (!e) full = false;
  //   }
  // }
  // return full;
}

innit(3, 3);
document.querySelector("button").addEventListener("click", () => {
  if (
    Number(document.querySelector("#n").value) <
    Number(document.querySelector("#m").value)
  ) {
    alert("n >= m");
    return;
  }

  innit(document.querySelector("#n").value, document.querySelector("#m").value);
});
