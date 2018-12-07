const fs = require("fs");

fs.readFile("input.txt", (err, data) => {
  const coords = data.toString().split(/\r?\n/);
  coords.pop();

  let points = [];
  coords.map(coord => {
    points.push(coord.split(", "));
  });

  // Find the outer areas of the grid
  let top = [0, 9999999];
  let bottom = [0, 0];

  let left = [9999999, 0];
  let right = [0, 0];

  for (let i = 0; i < points.length; i++) {
    if (Number(points[i][0]) < left[0]) {
      left = points[i];
    } else if (Number(points[i][0]) > right[0]) {
      right = points[i];
    }

    if (Number(points[i][1]) < top[1]) {
      top = points[i];
    } else if (Number(points[i][1]) > bottom[1]) {
      bottom = points[i];
    }
  }

  let minX = Number(left[0]);
  let maxX = Number(right[0]);
  let minY = Number(top[1]);
  let maxY = Number(bottom[1]);

  let closestPointsObj = {};

  // Taxi geometry calculator
  calcTaxi = (x1, y1, x2, y2) => {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  };

  // Find all points that don't overlap any other point
  let nonMatching = [];
  for (let i = minX; i < maxX - minX; i++) {
    for (let j = minY; j < maxY - minY; j++) {
      let nearest = null;
      let dist = 9999999;
      for (let k = 0; k < points.length; k++) {
        let taxi = calcTaxi(Number(points[k][0]), Number(points[k][1]), i, j);
        if (taxi < dist) {
          if (nearest === null) {
            nearest = points[k];
            dist = taxi;
          } else if (taxi === dist) {
            nearest = null;
            break;
          }
        }
      }
      if (nearest !== null) {
        nonMatching.push([i, j]);
      }
    }
  }

  // Assign each remaining coord to a point
  for (let i = 0; i < nonMatching.length; i++) {
    let nearest;
    let dist = 9999999;
    for (let j = 0; j < points.length; j++) {
      let taxi = calcTaxi(
        Number(points[j][0]),
        Number(points[j][1]),
        nonMatching[i][0],
        nonMatching[i][1]
      );
      if (taxi <= dist) {
        nearest = points[j];
        dist = taxi;
      }
    }
    if (!closestPointsObj.hasOwnProperty(nearest)) {
      closestPointsObj[nearest] = [];
    }
    closestPointsObj[nearest].push(nonMatching[i]);
  }

  // Find the point with the most points
  let longestLen = 0;
  let biggest;
  for (let i = 0; i < points.length; i++) {
    if (closestPointsObj[points[i]]) {
      console.log(closestPointsObj[points[i]].length);
      // if (closestPointsObj[points[i]].length > longestLen) {
      //   longestLen = closestPointsObj[points[i]].length;
      //   biggest = closestPointsObj[points[i]];
      // }
    }
  }
  console.log(biggest.length);

  // let sX = 9999;
  // let bX = 0;
  // let sY = 9999;
  // let bY = 0;
  // biggest.map(vector => {
  //   if (Number(vector[0]) < sX) {
  //     sX = vector[0];
  //   }
  //   if (Number(vector[0]) > bX) {
  //     bX = vector[0];
  //   }
  //   if (Number(vector[1]) < sY) {
  //     sY = vector[1];
  //   }
  //   if (Number(vector[1]) > bY) {
  //     bY = vector[1];
  //   }
  // });
  //
  // const biggestArea = (bX - sX) * (bY - sY);
  // console.log(biggestArea);
});
