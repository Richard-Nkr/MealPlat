import "./style.css";
import useRecipeCard from "../../hooks/useRecipeCard";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { constants } from "../../constants";

//l'URL est par exemple "/recipe/card/1234"
const RecipeCard = () => {
  const [result, setResults] = useState([]);

  const { id } = useParams(); //Je dois récupérer l'id 1234

  const fetchRecipe = useRecipeCard();

  const fetchData = async (e) => {
    const result = await fetchRecipe(id);
    setResults(result.url);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Link to={constants.PATHS.HOME}>HOME</Link>
      <div>
        <img className="img_recipe" src={result}></img>
      </div>
      <br></br>
    </>
  );
};

export default RecipeCard;
