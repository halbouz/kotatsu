async function braidFetch(method, headers, body) {
  const response = await fetch(
    `https://kotatsu.app/api/board`,
    {
      method,
      headers,
      body
    }
  );
  const json = await response.json()
  return json;
}

window.addEventListener("load", async () => {

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

  // for deployment
  for (let i = 1; i < 11; i++) {
    for (let j = 1; j < 11; j++) {
      let c = document.getElementById(`${i}_${j}`);
      c.addEventListener("keydown", async (event) => {
        if (event.key === "Backspace" || event.key === "Delete" || event.key === " " || event.key === "Enter") {
          event.preventDefault();
        }
      });
      c.addEventListener("beforeinput", () => {
        c.textContent = "";
      });
      c.addEventListener("input", async () => {
        if (c.textContent.length > 5) {
          c.textContent = ".";
        }
        const response = await braidFetch(
          "PUT", 
          {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          JSON.stringify({
            char: c.textContent,
            coord: `${i}_${j}`
          })
        );
        console.log(response);
      });
    }
  }

  const reset_button = document.getElementById("reset");
  reset_button.addEventListener("click", async () => {
    for (let i = 1; i < 11; i++) {
      for (let j = 1; j < 11; j++) {
        let c = document.getElementById(`${i}_${j}`);
        c.textContent = ".";
      }
    }
    const response = await braidFetch("POST", {}, {});
    console.log(response);
  });
});
