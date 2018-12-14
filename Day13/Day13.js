const fs = require("fs");

fs.readFile("input.txt", (err, data) => {
  const track = data.toString().split(/\r?\n/);
  console.log(track[1].split("").length);

  const trackMap = [...Array(track.length)].map(() => []);

  for (let i = 0; i < trackMap.length; i++) {
    let column = track[i].split("");
    for (let j = 0; j < column.length; j++) {
      trackMap[i].push(column[j]);
    }
  }

  console.log(trackMap[6].join(""));
});
