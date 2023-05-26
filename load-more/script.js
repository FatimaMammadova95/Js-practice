const BASE_URL = "http://localhost:8000/users";

let row = document.querySelector(".row");
let search = document.querySelector("input");
let sortBtn = document.querySelector(".sort");
let load = document.querySelector(".load");

let dataArr = [];
let copyArr = [];
let sorted = [];

let max = 4;
let sortStatus = false;

function createCard(arr) {
  row.innerHTML = "";
  arr.forEach((element) => {
    row.innerHTML += `
        <div class="col-3">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title">${element.name}</h5>
            <p class="card-text">
              ${element.quantityPerUnit}
            </p>
            <p>${element.unitPrice}</p>
            <a href="#" class="btn btn-primary" onclick = delete(${element.id})>Delete</a>
          </div>
        </div>
      </div>
        `;
  });
}

async function getData() {
  let res = await axios(BASE_URL);
  dataArr = res.data;
  copyArr = search.value ? copyArr : res.data;
  createCard(sliceArr(copyArr));
}
getData();

search.addEventListener("input", function (e) {
  copyArr = dataArr;
  copyArr = copyArr.filter((item) =>
    item.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  createCard(sliceArr(copyArr));
});

sortBtn.addEventListener("click", async function () {
  console.log("den");
  sortStatus = true;
  if (sortBtn.innerHTML == "Sort") {
    sortBtn.innerHTML = "Ascending";
    copyArr = copyArr.toSorted((a, b) => a.unitPrice - b.unitPrice);
  } else if (sortBtn.innerHTML == "Ascending") {
    sortBtn.innerHTML = "Descending";
    copyArr = copyArr.toSorted((a, b) => b.unitPrice - a.unitPrice);
  } else {
    sortBtn.innerHTML = "Sort";
    copyArr = dataArr;
    sortStatus = false;
  }
  sorted = copyArr;
  createCard(sliceArr(copyArr));
});

function sliceArr(arr) {
  return arr.slice(0, max);
}

load.addEventListener("click", function () {
  max = max + 4;
  if (max >= dataArr.length) {
    load.style.display = "none";
  }
  if (!sortStatus) {
    getData();
  } else {
    createCard(sliceArr(sorted));
  }
});
