let points;
let allPoints = [];

const canvas = document.getElementById("myChart");
const ctx = canvas.getContext("2d");

const drawPoint = (x, y) => {
  ctx.fillRect(x, y, 5, 5);
};

fetch("input.txt")
  .then(response => response.text())
  .then(text => (points = text))
  .then(() => startCanvas());

const startCanvas = () => {
  let pointsArray = points.split("\n");
  pointsArray.pop();

  pointsArray.map(point => {
    let coords = point.split(", ");
    let xCoMax = Math.floor(Number(coords[0].slice(10, 16)));
    let yCoMax = Math.floor(Number(coords[1].slice(0, 6)));

    let xCo = canvas.width / 2 + xCoMax / 500;
    let yCo = canvas.height / 3 + yCoMax / 500;
    let accX = Number(coords[1].slice(18, 20));
    let accY = Number(coords[2].slice(0, 2));
    let pixel = { x: xCo, y: yCo, accelX: accX, accelY: accY };
    console.log(pixel);
    allPoints.push(pixel);
  });

  allPoints.map(point => {
    drawPoint(point.x, point.y);
  });
};

const passSecond = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < allPoints.length; i++) {
    allPoints[i].x += allPoints[i].accelX;
    allPoints[i].y += allPoints[i].accelY;
    drawPoint(allPoints[i].x, allPoints[i].y);
  }
};

setInterval(passSecond, 5);
