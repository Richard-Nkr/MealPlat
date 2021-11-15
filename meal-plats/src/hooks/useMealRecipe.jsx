const useMealRecipe = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const cuisines = ["African", "American", "British", "Chinese", "French"];
  const titles = ["rice", "pasta", "tomato", "eggs", "cheese"];
  const ingredients = ["tomato", "milk", "pasta", "cheese", "eggs"];
  const calories = ["300", "400", "500", "600", "700"];
  const proteins = ["2", "3", "4", "5", "6"];

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const random = getRandomInt(5);

  //const query_cuisine = cuisines[random];
  const ingredient = ingredients[random];
  const title = titles[random];
  const calorie = calories[random];
  const protein = proteins[random];

  const fetchRecipe = async () => {
    const result = await fetch(
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
        API_KEY +
        "&titleMatch=" +
        title +
        "&includeIngredients=" +
        ingredient +
        "&number=3&maxCalories=" +
        calorie +
        "&minProtein=" +
        protein
    );

    return result.json();
  };

  return fetchRecipe;
};

export default useMealRecipe;
