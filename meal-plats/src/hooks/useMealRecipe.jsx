const useMealRecipe = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const cuisine = ["African", "American", "British", "Chinese", "French"];

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const random = getRandomInt(5);

  const query_cuisine = cuisine[random];

  const fetchRecipe = async () => {
    const result = await fetch(
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
        API_KEY +
        "&cuisine=" +
        query_cuisine +
        "&number=3"
    );
    return result.json();
  };
  return fetchRecipe;
};

export default useMealRecipe;
