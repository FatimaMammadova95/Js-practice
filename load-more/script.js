const BASE_URL = "http://localhost:8000/users";

let row = document.querySelector(".row");
let search = document.querySelector("input");
let sortBtn = document.querySelector(".sort");
let load = document.querySelector(".load");

let dataArr = [];
let copyArr = [];
let sortedArr = [];

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
  copyArr = search.value || copyArr.length ? copyArr : res.data;
  createCard(sliceArr(copyArr));
}
getData();

search.addEventListener("input", function (e) {
  copyArr = sortedArr.length ? sortedArr : dataArr;
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
    sortedArr = copyArr.toSorted((a, b) => a.unitPrice - b.unitPrice);
  } else if (sortBtn.innerHTML == "Ascending") {
    sortBtn.innerHTML = "Descending";
    sortedArr = copyArr.toSorted((a, b) => b.unitPrice - a.unitPrice);
  } else {
    sortBtn.innerHTML = "Sort";
    sortedArr = copyArr;
  }
  createCard(sliceArr(sortedArr));
});

function sliceArr(arr) {
  return arr.slice(0, max);
}

load.addEventListener("click", function () {
  if (load.innerHTML == "Load More") {
    max = max + 4;
    if (max >= dataArr.length) {
      load.innerHTML = "Load Less";
    }
  } else {
    max = max - 4;
    if (max <= 4) {
      load.innerHTML = "Load More";
    }
  }
  if (!sortStatus) {
    getData();
  } else {
    createCard(sliceArr(sortedArr));
  }
});
