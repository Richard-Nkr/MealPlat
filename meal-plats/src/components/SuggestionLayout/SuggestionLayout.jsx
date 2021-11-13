import "./style.css";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useMealRecipe from "../../hooks/useMealRecipe";
import SuggestionCard from "../SuggestionCard/SuggestionCard";
import Button from "../Button/Button";
import { ThemeContext } from "../../Context/Theme";

const SuggestionLayout = () => {
  const [{ theme, isDark }, toggleTheme] = useContext(ThemeContext);
  const [results, setResults] = useState([]);
  console.log(theme.color);

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
      <div className="d-flex flex-column">
        <h1 style={{ color: theme.color }}> Suggestions de recettes</h1>
        <SuggestionCard array={results}></SuggestionCard>
        <div className="div_button">
          <Button
            text="Voir d'autres recettes"
            onClick={fetchData}
            color={theme.backgroundColor}
            width="400px"
          ></Button>
        </div>
      </div>
    </>
  );
};

export default SuggestionLayout;
