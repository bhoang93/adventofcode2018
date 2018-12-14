const fs = require("fs");

fs.readFile("testinput.txt", (err, data) => {
  const plantData = data.toString().split(/\r?\n/);
  plantData.pop();

  let state = plantData[0].split(" ")[2].split("");
  state.unshift(".", ".", ".");
  state.push(".", ".", ".");

  const instructions = plantData.slice(2, plantData.length);

  let counter = 0;
  while (counter < 20) {
    let newState = state;

    for (let i = 0; i < state.length - 0; i++) {
      let plants = [];
      for (let j = -2; j < 3; j++) {
        plants.push(state[i + j]);
      }

      for (let k = 0; k < instructions.length; k++) {
        if (plants.join("") === instructions[k].slice(0, 5)) {
          newState[i] = instructions[k].charAt(9);
          break;
        }
      }
    }
    console.log(state.join(""));
    newState.push(".", ".", ".");
    state = newState;
    counter++;
  }

  let plantCount = 0;
  state.map((plant, index) => {
    if (plant === "#") {
      plantCount += index - 3;
    }
  });

  console.log(plantCount);
});
