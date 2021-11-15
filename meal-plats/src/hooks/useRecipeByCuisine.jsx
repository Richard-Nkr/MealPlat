const useRecipeByCuisine = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const calories = ["300", "400", "500", "600", "700"];
  const proteins = ["5", "6", "7", "8", "9"];

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const random = getRandomInt(5);

  const calorie = calories[random];
  const protein = proteins[random];

  const fetchRecipe = async (cuisine) => {
    console.log("OKKK");
    console.log(cuisine);
    const result = await fetch(
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
        API_KEY +
        "&cuisine=" +
        cuisine +
        "&number=4&maxCalories=" +
        calorie +
        "&minProtein=" +
        protein
    );

    return result.json();
  };

  return fetchRecipe;
};

export default useRecipeByCuisine;
