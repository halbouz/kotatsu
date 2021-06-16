const grid = document.getElementById("grid");

for (let i = 0; i < 100; i++) {
  grid.innerHTML += "<div class='cell' maxLength=1 minLength=1 contenteditable=true>.</textarea>";
}

const cell = document.querySelectorAll(".cell");
console.log(cell);

for (let c of cell) {
  c.addEventListener("keydown", (event) => {
		event.preventDefault()
    if (event.key === "Backspace") {
      c.textContent = ".";
    } else if (event.key === "Enter") {
      c.blur()
    } else if (/[\w]/.test(event.key)) {
      console.log("hello");
      c.textContent = event.key;
      console.log(c.textContent);
    }
  });
}
