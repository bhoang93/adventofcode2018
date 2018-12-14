const serialNumber = 9435;
const height = 300;
const width = 300;
const cells = [...Array(300)].map(() => [...Array(300)].map(() => 0)); // Create a 300 x 300 grid

getCellPowerLevel = (xCo, yCo) => {
  // Calculate the power of a cell
  let rackId = xCo + 10;
  let powerLevel = rackId * yCo;
  powerLevel += serialNumber;
  powerLevel *= rackId;
  let powerString = powerLevel.toString();
  powerLevel = Number(powerString.charAt(powerString.length - 3));
  powerLevel -= 5;
  return powerLevel;
};

for (let x = 1; x < width; x++) {
  // Parial sum table
  for (let y = 1; y < height; y++) {
    cells[x][y] = getCellPowerLevel(x, y) + cells[x - 1][y]; // Cell = its own power + sum of all cells to the left
    for (let z = 1; z < y; z++) {
      cells[x][y] += getCellPowerLevel(x, y - z); // + All cells above it
    }
  }
}

let bestGrid;
let highestPowerLevel = 0;
let gridSize;
let area = 1;

findSumOfArea = a => {
  for (let gridY = 0; gridY < height; gridY++) {
    for (let gridX = 0; gridX < width; gridX++) {
      if (gridX - a < 1 || gridY - a < 1) continue;

      let gridPowerLevel = // Power of an area of cells is:
        cells[gridX][gridY] - // The bottom right cell of the area
        cells[gridX - a][gridY] - // minus the cell to the left of the bottom left of the area
        cells[gridX][gridY - a] + // minus the cell above the top right of the area
        cells[gridX - a][gridY - a]; // plus the cell diagonal to the top left cell

      if (gridPowerLevel > highestPowerLevel) {
        highestPowerLevel = gridPowerLevel;
        // Find the coordinates of the top left cell of the area
        let xCo = gridX - a + 1;
        let yCo = gridY - a + 1;
        bestGrid = xCo + "," + yCo;
        gridSize = a;
      }
    }
  }
};

while (area <= 300) {
  findSumOfArea(area);
  area++;
}

console.log(bestGrid + "," + gridSize);
