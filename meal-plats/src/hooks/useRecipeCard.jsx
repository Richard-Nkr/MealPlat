const useRecipeCard = () => {
  const fetchRecipeCard = async (id) => {
    console.log(id);
    const API_KEY = process.env.REACT_APP_API_KEY;

    const result = await fetch(
      "https://api.spoonacular.com/recipes/" + id + "/card?apiKey=" + API_KEY
    );

    return result.json();
  };

  return fetchRecipeCard;
};

export default useRecipeCard;
