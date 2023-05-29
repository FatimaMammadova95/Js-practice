let counterSec = document.querySelector("#counter");
let counters = document.querySelectorAll(".data");

let active = false;

window.addEventListener("scroll", () => {
  if (
    pageYOffset > counterSec.offsetTop - counterSec.offsetHeight - 200 &&
    active === false
  ) {
    counters.forEach((counter) => {
      counter.innerText = 0;
      let count = 0;
      function updateCount() {
        const target = parseInt(counter.dataset.count);
        if (count < target) {
          count++;
          counter.innerText = count;
          setTimeout(updateCount, 10);
        } else {
          counter.innerText = target;
        }
      }
      updateCount();
      active = true;
    });
  } else if (
    pageYOffset < counterSec.offsetTop - counterSec.offsetHeight - 500 ||
    (pageYOffset === 0 && active === true)
  ) {
    counters.forEach((counter) => {
      counter.innerText = 0;
    });
    active = false;
  }
});
