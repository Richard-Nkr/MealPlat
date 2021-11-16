const useMealRecipeByQuery = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const fetchRecipe = async (query) => {
    console.log(query);
    const result = await fetch(
      "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" +
        API_KEY +
        "&ingredients=" +
        query +
        "&number=4"
    );
    return result.json();
  };

  return fetchRecipe;
};

export default useMealRecipeByQuery;
