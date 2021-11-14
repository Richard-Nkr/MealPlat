import "./style.css";
import useRecipeCard from "../../hooks/useRecipeCard";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { constants } from "../../constants";
import Navbar from "../../components/Navbar/Navbar";

//l'URL est par exemple "/recipe/card/1234"
const RecipeCard = () => {
  const [result, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams(); //Je dois récupérer l'id 1234

  const fetchRecipe = useRecipeCard();

  const fetchData = async (e) => {
    setLoading(true);
    const result = await fetchRecipe(id);
    setTimeout(() => {
      setResults(result.url);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <div class="middle">
        <div class="bar bar1"></div>
        <div class="bar bar2"></div>
        <div class="bar bar3"></div>
        <div class="bar bar4"></div>
        <div class="bar bar5"></div>
        <div class="bar bar6"></div>
        <div class="bar bar7"></div>
        <div class="bar bar8"></div>
      </div>
      ) : (
        <img className="img_recipe" src={result} alt="card"></img>
      )}
    </>
  );
};

export default RecipeCard;
