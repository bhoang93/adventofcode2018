const fs = require("fs");

fs.readFile("input.txt", (err, data) => {
  const ids = data.toString().split(/\r?\n/);
  ids.pop();

  for (let i = 0; i < ids.length - 1; i++) {
    let chars = ids[i].split("");
    let chars2;
    let notMatch;
    for (let j = i + 1; j < ids.length; j++) {
      notMatch = 0;
      chars2 = ids[j].split("");
      for (let k = 0; k < chars.length; k++) {
        if (chars[k] !== chars2[k]) {
          notMatch++;
        }
        if (notMatch > 1) break;
      }
      if (notMatch === 1) {
        const string = chars.filter(
          char => char === chars2[chars.indexOf(char)]
        );
        console.log(string.join(""));
      }
    }
  }
});
