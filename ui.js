window.addEventListener("load", async () => {

  const response = await fetch('https://kotatsu-server-silk.vercel.app/api/board')
  const board = await response.json()
  console.log(board)

  const grid = document.getElementById("grid");
  let isCtrlPressed = false;

  for (let i = 1; i < 11; i++) {
    for (let j = 1; j < 11; j++) {
      let coord = board[`${i}_${j}`]
      grid.innerHTML += `<div class='cell' id='${i}_${j}' contenteditable=true>${coord}</div>`;
    }
  }

  document.addEventListener("keydown", (event) => {
    if (event.ctrlKey) {
      isCtrlPressed = true;
    }
  });
  
  document.addEventListener("keyup", (event) => {
    if (!event.ctrlKey) {
      isCtrlPressed = false;
    }
  });
  
  const cell = document.querySelectorAll(".cell");
  
  for (let c of cell) {
    c.addEventListener("keydown", (event) => {
      if (event.key === "Backspace" || event.key === "Delete") {
        event.preventDefault();
        c.textContent = ".";
      } else if (/^[^\s]$/i.test(event.key)) {
        if (!isCtrlPressed) {
          c.textContent = event.key;
          console.log(c.textContent);
        }
      } else if (
        event.key !== "Shift" &&
        event.key !== "Control" &&
        event.key !== "Alt" &&
        event.key !== "Meta" &&
        !/^F[0-9]+$/.test(event.key)
      ) {
        c.blur();
      }
    });
    c.addEventListener("beforeinput", () => {
      c.textContent = "";
    });
    c.addEventListener("input", () => {
      if (c.textContent.length > 5) {
        c.textContent = ".";
      }
    });
  }
  
});