const fs = require("fs");

fs.readFile("input.txt", (err, data) => {
  const result = data.toString().split(" ");
  console.log(result);

  let players = [];
  const playerTotal = Number(result[0]);
  for (let i = 0; i < playerTotal; i++) {
    players.push(0); // Create an array with the correct number of players;
  }

  const lastMarble = Number(result[6]) * 100;
  const circle = [0]; // The first marble is placed by no one
  let currentPlayer = 1;
  let currentMarble;

  for (let i = 1; i < lastMarble; i++) {
    let position; // Add 2 places after last marble unless it is more than the circumference of the circle
    if (circle.length === 0) {
      position = 0;
    } else {
      position = circle.indexOf(currentMarble) + 2;
    }
    if (position > circle.length) {
      position -= circle.length;
    }

    circle.splice(position, 0, i); // Add marble at correct position

    if (i % 23 === 0 && i !== 0) {
      // If marble number is a multiple of 23 and is not 0
      circle.splice(position, 1);
      let secondMarblePos = circle.indexOf(currentMarble) - 7;
      if (secondMarblePos < 0) {
        secondMarblePos = circle.length + secondMarblePos; // If 7 marbles counter clockwise is less than 0, subtract the remainder from the circumference
      }
      let secondMarble = circle[secondMarblePos];
      players[currentPlayer - 1] += i + secondMarble; // Add the score to the current player

      currentMarble = circle[secondMarblePos + 1]; // Set new current marble
      circle.splice(secondMarblePos, 1);
    } else {
      currentMarble = i;
    }

    currentPlayer++;
    if (currentPlayer > playerTotal) {
      currentPlayer = 1; // Loop through players
    }
  }

  let highScore = 0;
  for (let i = 0; i < players.length; i++) {
    if (players[i] > highScore) {
      highScore = players[i];
    }
  }
  console.log(highScore);
});
