const fs = require("fs");

fs.readFile("input.txt", (err, data) => {
  const tree = data.toString().split(" ");

  let metadataSum = 0; // Total of the metadata
  let checkedIndexes = []; // All the indexes of tree that have been evaluated

  findMetaData = (index, numMeta) => {
    checkedIndexes.push(index, index + 1);
    let childCount = Number(tree[index]);
    let metaCount = Number(tree[numMeta]);

    let count = 2;
    while (childCount > 0) {
      // If the node has children, call function with those children
      while (checkedIndexes.includes(index + count)) {
        count += 1; // Once that child has been evaluated, find the next child
      }
      findMetaData(index + count, index + count + 1);
      childCount--; // Continue until all children have been completed
    }

    for (let j = 0; j < metaCount; j++) {
      // Once the child count and metadata count have been checked only the metadata will remain
      for (let k = 0; k < tree.length; k++) {
        if (checkedIndexes.includes(k)) continue;
        metadataSum += Number(tree[k]);
        checkedIndexes.push(k);
        break;
      }
    }
  };

  for (let i = 0; i < tree.length; i++) {
    if (checkedIndexes.includes(i)) continue;
    findMetaData(i, i + 1);
  }

  console.log(metadataSum);
});
