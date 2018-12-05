// const fs = require("fs");
//
// fs.readFile("input.txt", (err, data) => {
//   const claims = data.toString().split(/\r?\n/);
//   claims.pop();
//
//   let spaces = [];
//   let checked = [];
//   let overlapTotal = 0;
//
//   for (let i = 0; i < claims.length; i++) {
//     let dimensions = claims[i].split(" ");
//
//     let lengths = dimensions[2].split(",");
//     let lenX = Number(lengths[0]);
//     let lenY = Number(lengths[1].slice(0, lengths[1].length - 1));
//
//     let rect = dimensions[3].split("x");
//     let rectX = Number(rect[0]);
//     let rectY = Number(rect[1]);
//
//     for (let j = 0; j < rectY; j++) {
//       for (let k = 0; k < rectX; k++) {
//         let xCo = lenX + k;
//         let yCo = lenY + j;
//         let coord = xCo + "," + yCo;
//
//         if (spaces.includes(coord) && !checked.includes(coord)) {
//           overlapTotal++;
//           checked.push(coord);
//         } else {
//           spaces.push(coord);
//         }
//       }
//     }
//   }
//   console.log(overlapTotal);
// });

const fs = require("fs");

fs.readFile("input.txt", (err, data) => {
  const claims = data.toString().split(/\r?\n/);
  claims.pop();

  let spaces = [];
  let checked = [];
  let idArray = [];

  for (let i = 0; i < claims.length; i++) {
    let overlap = false;
    let dimensions = claims[i].split(" ");

    let id = dimensions[0];
    let lengths = dimensions[2].split(",");
    let lenX = Number(lengths[0]);
    let lenY = Number(lengths[1].slice(0, lengths[1].length - 1));

    let rect = dimensions[3].split("x");
    let rectX = Number(rect[0]);
    let rectY = Number(rect[1]);

    for (let j = 0; j < rectY; j++) {
      for (let k = 0; k < rectX; k++) {
        let xCo = lenX + k;
        let yCo = lenY + j;
        let coord = xCo + "," + yCo;

        if (spaces.includes(coord) && !checked.includes(coord)) {
          overlap = true;
          checked.push(coord);
        } else {
          spaces.push(coord);
        }
      }
    }
    if (!overlap) {
      idArray.push(id);
    }
  }

  for (let i = 0; i < claims.length; i++) {
    let overlap = false;
    let dimensions = claims[i].split(" ");
    let correctId = dimensions[0];
    let lengths = dimensions[2].split(",");
    let lenX = Number(lengths[0]);
    let lenY = Number(lengths[1].slice(0, lengths[1].length - 1));

    let rect = dimensions[3].split("x");
    let rectX = Number(rect[0]);
    let rectY = Number(rect[1]);

    for (let j = 0; j < rectY; j++) {
      for (let k = 0; k < rectX; k++) {
        let xCo = lenX + k;
        let yCo = lenY + j;
        let coord = xCo + "," + yCo;

        if (checked.includes(coord)) {
          overlap = true;
          continue;
        }
      }
    }

    if (!overlap) {
      console.log(correctId);
    }
  }
});
