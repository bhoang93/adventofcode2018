const fs = require("fs");

fs.readFile("input.txt", (err, data) => {
  const polymer = data.toString().split("");
  polymer.pop();

  const reaction = arr => {
    for (let i = 0; i < arr.length - 1; i++) {
      if (
        arr[i] !== arr[i + 1] && // a === A returns false
        arr[i].toLowerCase() === arr[i + 1].toLowerCase() // a === a returns true
      ) {
        arr.splice(i, 2);
      }
    }
  };

  const chainReaction = arr => {
    let loop = true;
    let prevLength = arr.length;
    do {
      reaction(arr);
      prevLength === arr.length ? (loop = false) : (prevLength = arr.length);
    } while (loop);
  };

  let shortestLength = polymer.length;
  for (let i = 0; i < 26; i++) {
    let removedLetter = (i + 10).toString(36); // Loop through alphabet
    let removedArray = polymer.filter(
      letter => letter.toLowerCase() !== removedLetter
    );

    chainReaction(removedArray);

    if (removedArray.length < shortestLength) {
      shortestLength = removedArray.length;
    }
  }

  chainReaction(polymer);

  console.log(polymer.length); // Part 1
  console.log(shortestLength); // Part 2
});
