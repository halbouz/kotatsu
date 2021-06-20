window.addEventListener("load", async () => {
  const response = await fetch(
    "https://kotatsu-server-silk.vercel.app/api/board"
  );
  const board = await response.json();
  console.log(board);

  const grid = document.getElementById("grid");
  let isCtrlPressed = false;

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

  for (let i = 1; i < 11; i++) {
    for (let j = 1; j < 11; j++) {
      let coord = board[`${i}_${j}`];
      grid.innerHTML += `<div class='cell' id='${i}_${j}' contenteditable=true>${coord}</div>`;
    }
  }

  for (let i = 1; i < 11; i++) {
    for (let j = 1; j < 11; j++) {
      let c = document.getElementById(`${i}_${j}`);
      c.addEventListener("keydown", async (event) => {
        if (event.key === "Backspace" || event.key === "Delete") {
          event.preventDefault();
          c.textContent = ".";
          const response = await fetch(`https://kotatsu-server-silk.vercel.app/api/${i}_${j}`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            char: '.'
          }),
        });
        const success = await response.json();
        console.log(success);
        } else if (/^[^\s]$/i.test(event.key)) {
          if (!isCtrlPressed) {
            c.textContent = event.key;
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
        if (!isCtrlPressed) {
          c.textContent = "";
        }
      });
      c.addEventListener("input", async () => {
        if (c.textContent.length > 5) {
          c.textContent = ".";
        }
        console.log(c.textContent)
        console.log(`${i}_${j}`);
        const response = await fetch(`https://kotatsu-server-silk.vercel.app/api/${i}_${j}`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            char: c.textContent
          }),
        });
        const success = await response.json();
        console.log(success);
      });
    }
  }
});
