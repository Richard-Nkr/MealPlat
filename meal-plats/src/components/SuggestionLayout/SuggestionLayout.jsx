import "./style.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useMealRecipe from "../../hooks/useMealRecipe";
import Circle from "../Circle/Circle";
import Header from "../Header/Header";
import SuggestionCard from "../SuggestionCard/SuggestionCard";

const SuggestionLayout = () => {
  const [array, setResults] = useState([]);

  const fetchRecipe = useMealRecipe();

  // Après le clic sur un bouton, j'exécute cette fonction
  const fetchData = async () => {
    // Mon fetch est asynchrone, je mets un await. C'est mon custom hook qui me fournit cette fonction
    const result = await fetchRecipe();
    setResults(result.results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header
        title="Qui sommes-nous ?"
        text="MealPlats est une application web dans laquelle vous pourrez retrouver des milliers de recettes."
        buttonTitle="DECOUVRIR"
      ></Header>
      <div className="center-div">
        <h1>Suggestions de recettes</h1>
        <SuggestionCard array={array}></SuggestionCard>
      </div>
      <button onClick={fetchData}>Voir d'autres recettes</button>
    </>
  );
};

export default SuggestionLayout;
