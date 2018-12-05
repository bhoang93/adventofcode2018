const fs = require("fs");

fs.readFile("input.txt", (err, data) => {
  const ids = data.toString().split(/\r?\n/);
  ids.pop();

  const checkChar = len => {
    let total = 0;

    for (let i = 0; i < ids.length; i++) {
      // Loop through all the strings
      let chars = ids[i].split(""); // Split characters into array
      let checkedChars = []; // Characters that have already been checked
      let correct = false;
      for (let j = 0; j < chars.length - 1; j++) {
        // Loop through the current string
        let count = 1; // Total times a character appears

        if (checkedChars.includes(chars[j])) {
          continue; // If character has already been checked skip this iteration
        } else {
          checkedChars.push(chars[j]); // Otherwise add the character to the list
        }

        for (let k = j + 1; k < chars.length; k++) {
          // i = current string, j = current character, k = comparission character

          if (chars[j] === chars[k]) {
            // If characters match
            count++;
          }
        }
        if (count === len) {
          correct = true; // If the character appears the correct amount of times it meets the criteria
        }
      }
      if (correct) total++;
    }
    return total;
  };

  const checkSum = checkChar(2) * checkChar(3);

  console.log(checkSum);
});
