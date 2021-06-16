const grid = document.getElementById("grid");

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++){
    grid.innerHTML += `<div class='cell' id='(${i},${j})' contenteditable=true>.</textarea>`;
  }
  
}

const cell = document.querySelectorAll(".cell");

for (let c of cell) {
  c.addEventListener("keydown", (event) => {
    event.preventDefault();
    if (event.key === "Backspace") {
      c.textContent = ".";
    } else if (/^[^\s]$/i.test(event.key)){
      c.textContent = event.key;
      console.log(c.textContent);
    } else if (event.key !== 'Shift' && event.key !== 'Control' && event.key !== 'Alt' && event.key !== 'Meta') {
      c.blur();
    }
  });
  c.addEventListener('input', () => {
    if (c.textContent.length > 1) {
      c.textContent = '.'
    }
  })
}