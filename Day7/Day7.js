const fs = require("fs");

fs.readFile("input.txt", (err, data) => {
  const instructions = data.toString().split(/\r?\n/);

  let steps = {}; // All the steps for each letter
  let letters = []; // List of letters that need to be completed
  let allLetters = []; // All the letters with steps
  instructions.map(step => {
    let letter = step.split(" ")[7]; // Letter that is trying to complete
    let completed = step.split(" ")[1]; // Requirement letter
    if (!allLetters.includes(completed)) {
      allLetters.push(completed);
    }
    if (!steps.hasOwnProperty(letter)) {
      steps[letter] = [];
      letters.push(letter);
    }
    steps[letter].push(step);
  });

  let originalReadyList = allLetters.filter(
    letter => !letters.includes(letter)
  ); // Find all the leters that are ready
  originalReadyList.sort(); // Sort into alphabetical order
  letters.sort();

  orderedList = [originalReadyList[0]]; // Can only start with first one because others might become available.
  while (orderedList.length < 26) {
    let readyList = []; // Holds all letters that might be ready
    for (let i = 0; i < letters.length; i++) {
      if (orderedList.includes(letters[i])) continue; // If already in the ordered list; skip
      let ready = true;
      for (let k = 0; k < steps[letters[i]].length; k++) {
        if (!orderedList.includes(steps[letters[i]][k].split(" ")[1])) {
          // If all the requirements are not met, its not ready
          ready = false;
        }
      }
      if (ready) {
        if (!orderedList.includes(letters[i])) {
          readyList.push(letters[i]);
        }
      }
    }
    if (readyList.length === 0) {
      // If no more letters are ready, add the next from original ready list
      for (let i = 0; i < originalReadyList.length; i++) {
        if (!orderedList.includes(originalReadyList[i])) {
          orderedList.push(originalReadyList[i]);
          break;
        }
      }
    } else {
      orderedList.push(readyList[0]); // Otherwise add the first ready letter
    }
  }
  console.log(orderedList.length, orderedList.join(""));
});
