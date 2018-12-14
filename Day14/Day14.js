const recipes = 37;
const recipeArray = recipes.toString().split("");
const totalRecipes = 047801;

let elf1 = { current: Number(recipeArray[0]), index: 0 }; // Keep track of current number and where it is in the list
let elf2 = { current: Number(recipeArray[1]), index: 1 };

findNewCurrent = elf => {
  let newCurrent = elf.current + elf.index + 1;
  while (newCurrent > recipeArray.length - 1) {
    newCurrent -= recipeArray.length; // If the next number is higher than the list length, loop around
  }
  elf.index = newCurrent; // Set new recipe
  elf.current = Number(recipeArray[newCurrent]); // Set new position
};

const findNewRecipes = () => {
  let newRecipes = elf1.current + elf2.current;
  newRecipes
    .toString()
    .split("")
    .map(recipe => recipeArray.push(Number(recipe))); // Split the characters of the sum of recipes and add them into the recipe list
  findNewCurrent(elf1);
  findNewCurrent(elf2);
};

while (recipeArray.length < totalRecipes + 10) {
  findNewRecipes();
}

const answer = recipeArray.slice(totalRecipes, totalRecipes + 10).join("");
console.log(answer);

// Part 2
let sequence = totalRecipes.toString().split("");
sequence.unshift(0); // 0 cut from the array
let index = null;
let checkedFrom = 0;

while (!index) {
  for (let i = checkedFrom; i < recipeArray.length; i++) {
    let values = recipeArray.slice(i, i + 6);
    if (values.join("") === sequence.join("")) {
      index = i;
      break;
    }
  }
  checkedFrom = recipeArray.length - 6; // Only check from where the last loop left off
  findNewRecipes(); // If no match is found, find more recipes
}

console.log(index);
