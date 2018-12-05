const fs = require("fs");

fs.readFile("input.txt", (err, data) => {
  const logList = data
    .toString()
    .split(/\r?\n/)
    .sort(); // Sort the data by date
  logList.pop();

  let guardObj = {}; // Will hold the activites of every guard
  let currentGuard; // Identifies which guard is sleeping or waking up
  let guardList = []; // A list of the guard IDs to cross reference with the object
  let sleepGuard; // Which guard is asleep for the longest

  // Create a list for each guard of when they slept
  logList.map(log => {
    if (log.includes("Guard #")) {
      currentGuard = log.split(" ")[3].slice(1, 10);
      if (!guardList.includes(currentGuard)) {
        guardList.push(currentGuard);
      }
    } else {
      if (!guardObj.hasOwnProperty(currentGuard)) {
        guardObj[currentGuard] = [];
      }
      guardObj[currentGuard].push(log);
    }
  });

  // Extract minutes from an entry
  const getMins = log => {
    return Number(log.split(" ")[1].slice(3, 5));
  };

  // Find which guard slept the most
  let mostSlept = 0;
  for (let i = 0; i < guardList.length; i++) {
    let cGuard = guardObj[guardList[i]];
    if (!cGuard) {
      continue;
    }

    let totalSleep = 0;
    for (let j = 0; j < cGuard.length - 1; j += 2) {
      totalSleep += getMins(cGuard[j + 1]) - getMins(cGuard[j]);
    }
    if (totalSleep > mostSlept) {
      mostSlept = totalSleep;
      sleepGuard = guardList[i];
    }
  }

  // Finds the minute a guard slept the most on
  const findMostMin = grd => {
    // Find all the minutes which they slept on
    if (!guardObj[grd]) {
      return;
    }
    let sleepArray = guardObj[grd]; // Holds all the times a guard is asleep or awake
    let minutesArray = []; // Holds all the minutes which a guard sleeps during

    for (let k = 0; k < sleepArray.length - 1; k += 2) {
      let minsSlept = getMins(sleepArray[k + 1]) - getMins(sleepArray[k]);
      let sleepEnd = getMins(sleepArray[k + 1]);
      for (let l = 1; l <= minsSlept; l++) {
        let min = sleepEnd - l;
        minutesArray.push(min);
      }
    }

    //Find the minute they slept the most on
    let most = 0; // The highest amount of times a minute has been slept on
    let mostMin; // The minute that has been slept on the most
    let checked = []; // Holds all the minutes that have already been checked
    for (let k = 0; k < minutesArray.length - 1; k++) {
      if (checked.includes(minutesArray[k])) {
        continue;
      }
      let reoccur = 0;
      for (let l = k + 1; l < minutesArray.length; l++) {
        if (minutesArray[k] === minutesArray[l]) {
          reoccur++;
        }
        checked.push(minutesArray[k]);
        if (reoccur > most) {
          most = reoccur;
          mostMin = minutesArray[k];
        }
      }
    }
    return { id: grd, most, mostMin };
  };

  // Find which the highest occurence of a minute being slept on and which minute it is
  let guardV2;
  let sleptOnMost = 0;
  for (let i = 0; i < guardList.length; i++) {
    let guard = findMostMin(guardList[i]);
    if (guard && guard.most) {
      if (guard.most > sleptOnMost) {
        sleptOnMost = guard.most;
        guardV2 = guard;
      }
    }
  }

  let guardV1 = findMostMin(sleepGuard);

  console.log(guardV1.id * guardV1.mostMin); // Part 1
  console.log(guardV2.id * guardV2.mostMin); // Part 2
});
