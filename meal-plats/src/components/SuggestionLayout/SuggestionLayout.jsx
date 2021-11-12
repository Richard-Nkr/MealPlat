import "./style.css";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useMealRecipe from "../../hooks/useMealRecipe";
import SuggestionCard from "../SuggestionCard/SuggestionCard";

const SuggestionLayout = () => {
  const [results, setResults] = useState([]);

  const fetchRecipe = useMealRecipe();

  const fetchData = async () => {
    const result = await fetchRecipe();
    setResults(result.results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="center-div">
        <h1> Idée de recettes</h1>
        <SuggestionCard array={results}></SuggestionCard>
      </div>
      <div className="low-div">
        <button className="button" onClick={fetchData}>
          Voir d'autres recettes
        </button>
      </div>
    </>
  );
};

export default SuggestionLayout;
