const fs = require("fs");

fs.readFile("input.txt", (err, data) => {
  const plantData = data.toString().split(/\r?\n/);
  plantData.pop();

  const initialState = plantData[0].split(" ")[2].split("");
  const instructions = plantData.slice(2, plantData.length);

  class Node {
    constructor(plant) {
      this.plant = plant;
      this.next = null;
      this.prev = null;
    }
  }

  class DoubleLinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
    }

    getLength() {
      let current = this.head;
      let counter = 0;
      while (current !== null) {
        counter++;
        current = current.next;
      }
      return counter;
    }

    add(plant) {
      let node = new Node(plant);

      if (!this.head) {
        this.head = node;
        this.tail = node;
      } else {
        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
      }
    }

    getAtIndex(index) {
      let current = this.head;
      let counter = 0;
      while (counter !== index) {
        current = current.next;
        counter++;
      }
      return current;
    }

    changeAtIndex(index, value) {
      let current = this.head;
      let counter = 0;
      while (counter !== index) {
        current = current.next;
        counter++;
      }
      current.plant = value;
    }
  }

  const allPlants = new DoubleLinkedList();

  initialState.map(plant => {
    allPlants.add(plant);
  });

  let counter = 0;
  while (counter < 20) {
    for (let i = 0; i < initialState.length; i++) {
      let currentPlant = allPlants.getAtIndex(i);
      let prevPlant = currentPlant.prev;
      if (prevPlant == null) {
        prevPlant = { plant: ".", prev: { plant: "." } };
      }
      let firstPlant = prevPlant.prev;
      let nextPlant = currentPlant.next;
      if (nextPlant == null) {
        nextPlant = { plant: ".", next: { plant: "." } };
      }
      let lastPlant = nextPlant.next;

      let surroundingPlants = [
        firstPlant.plant,
        prevPlant.plant,
        currentPlant.plant,
        nextPlant.plant,
        lastPlant.plant
      ].join("");

      for (let j = 0; j < instructions.length; j++) {
        if (surroundingPlants === instructions[j].slice(0, 4)) {
          allPlants.changeAtIndex(i, instructions[j].charAt(9));
        }
      }
    }
    counter++;
  }

  let plantCount = 0;
  let count = 0;
  while (count < initialState.length) {
    if (allPlants.getAtIndex(count).plant === "#") {
      plantCount++;
    }
    count++;
  }

  console.log(plantCount);
});
