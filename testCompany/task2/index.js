//
const row = document.querySelector("input#row");
const col = document.querySelector("input#col");
const render = document.querySelector("#render");
const renderInfinity = document.querySelector("#renderInfinity");
const table = document.querySelector("table");
const thead = table.querySelector("thead");
const tbody = table.querySelector("tbody");
let isInfinity = false;
let arrayCurrent = [];

//

function deleteEven() {
  arrayCurrent = [];
  document.querySelectorAll("th").forEach(e => {
    e.removeEventListener("click", handlerSort);
    e.remove();
  });
}

function handlerSort() {
  console.log(this.dataset.j);
  let j = this.dataset.j;
  arrayCurrent.sort((x, y) => x[j] - y[j]);
  renderFlCurrentArr();
}

function renderTable(row, col) {
  let header = "";
  //   let rowBody = "";
  let body = "";

  for (let i = 0; i < row; i++) {
    header += `<th data-j=${i} >${i}</th>`;
  }

  for (let i = 0; i < col; i++) {
    body += `<tr>`;
    let array = [];
    for (let j = 0; j < row; j++) {
      let ramdomNow = ramdom();
      array.push(ramdomNow);
      body += `<td data-i= ${i} data-j= ${j} >${ramdomNow}</td>`;
    }
    arrayCurrent.push(array);
    body += `</tr>`;
  }

  thead.innerHTML = `<tr>${header}</tr>`;
  document
    .querySelectorAll("th")
    .forEach(e => e.addEventListener("click", handlerSort));
  tbody.innerHTML = body;
}

function renderFlCurrentArr() {
  let body = "";
  for (let i = 0; i < arrayCurrent.length; i++) {
    body += `<tr>`;
    for (let j = 0; j < arrayCurrent[i].length; j++) {
      body += `<td data-i= ${i} data-j= ${j} >${arrayCurrent[i][j]}</td>`;
    }
    body += `</tr>`;
  }
  tbody.innerHTML = body;
}

function ramdom() {
  return Math.floor(Math.random() * 1000);
}

function handlerRender() {
  deleteEven();
  isInfinity = false;
  renderTable(row.value, col.value);
}

function addCol(col = 100) {
  for (let i = 0; i < col; i++) {
    let tr = document.createElement("tr");
    let array = [];
    for (let i = 0; i < document.querySelectorAll("th").length; i++) {
      let td = document.createElement("td");
      let ramdomNow = ramdom();
      td.append(`${ramdomNow}`);
      array.push(ramdomNow);
      tr.append(td);
    }

    arrayCurrent.push(array);
    tbody.append(tr);
  }
}

function handlerRenderInfinity() {
  deleteEven();
  isInfinity = true;
  renderTable(10, 100);
  window.addEventListener("scroll", () => {
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
      if (isInfinity) addCol();
    }
  });
}

window.addEventListener("scroll", () => {
  if (thead.offsetTop <= window.scrollY - thead.offsetHeight / 2) {
    document.body.classList.add("fix");
  } else document.body.classList.remove("fix");
});

render.addEventListener("click", handlerRender);

renderInfinity.addEventListener("click", handlerRenderInfinity);
