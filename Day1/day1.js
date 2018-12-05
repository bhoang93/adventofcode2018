const fs = require("fs");

// fs.readFile("input.txt", (err, data) => {
//   const freq = data.toString().split(/\r?\n/);
//   let totalFreq = 0;
//   freq.map(op => {
//     if (op.charAt(0) === "+") {
//       totalFreq += Number(op.slice(1, op.length));
//     } else {
//       totalFreq -= Number(op.slice(1, op.length));
//     }
//   });
//   console.log(totalFreq);
// });

fs.readFile("input.txt", (err, data) => {
  const freq = data.toString().split(/\r?\n/);
  freq.pop();
  let totalFreq = 0;
  let match = null;
  let freqArray = [];

  let i = 0;

  while (match === null) {
    if (freq[i].charAt(0) === "+") {
      totalFreq += Number(freq[i].slice(1, freq[i].length));
    } else {
      totalFreq -= Number(freq[i].slice(1, freq[i].length));
    }
    if (freqArray.includes(totalFreq)) {
      match = totalFreq;
    }
    i++;
    if (i === freq.length) {
      i = 0;
    }
    freqArray.push(totalFreq);
  }
  console.log(match);
});
