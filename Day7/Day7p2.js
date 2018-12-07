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

  let readyList = allLetters.filter(letter => !letters.includes(letter)); // Find all the leters that are ready
  readyList.sort(); // Sort into alphabetical order
  letters.sort();

  class Worker {
    constructor() {
      this.currentLetter = null;
      this.timeLeft = 0;
    }

    setTask(letter) {
      this.currentLetter = letter;
      this.timeLeft = letter.toLowerCase().charCodeAt(0) - 36; // converts to lowercase, charCodeAt converts letter into a number value  (-96 + 60)
    }

    timePass() {
      this.timeLeft -= 1;
    }
  }

  let toDoList = readyList;

  checkForReady = () => {
    for (let i = 0; i < letters.length; i++) {
      if (
        toDoList.includes(letters[i]) ||
        completedList.includes(letters[i]) ||
        inProgress.includes(letters[i])
      )
        continue; // If already in any list; skip
      let ready = true;
      for (let k = 0; k < steps[letters[i]].length; k++) {
        if (!completedList.includes(steps[letters[i]][k].split(" ")[1])) {
          // If all the requirements are not met, its not ready
          ready = false;
        }
      }
      if (ready) {
        toDoList.push(letters[i]);
        toDoList.sort();
      }
    }
  };

  let elfy = new Worker();
  let elfo = new Worker();
  let elfa = new Worker();
  let elfin = new Worker();
  let tony = new Worker();
  const workers = [elfy, elfo, elfa, elfin, tony];

  let timer = -1;
  let completedList = [];
  let inProgress = []; // What workers are currently working on

  while (completedList.length < 26) {
    timer++;
    workers.map(worker => {
      worker.timePass();
      if (worker.timeLeft <= 0) {
        if (
          worker.currentLetter !== null &&
          !completedList.includes(worker.currentLetter)
        ) {
          completedList.push(worker.currentLetter);
          inProgress.splice(inProgress.indexOf(worker.currentLetter), 1);
          checkForReady();
        }
      }
    });
    workers.map(worker => {
      if (worker.timeLeft <= 0) {
        if (toDoList.length !== 0) {
          for (let i = 0; i < toDoList.length; i++) {
            if (!inProgress.includes(toDoList[i])) {
              worker.setTask(toDoList[0]);
              inProgress.push(toDoList[0]);
              toDoList.splice(0, 1);
              break;
            }
          }
        }
      }
    });
  }
  console.log(timer);
});
