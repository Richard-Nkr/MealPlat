import "./style.css";
import { useState, useEffect, useContext } from "react";
import useMealRecipe from "../../hooks/useMealRecipe";
import SuggestionCard from "../SuggestionCard/SuggestionCard";
import Button from "../Button/Button";
import { ThemeContext } from "../../Context/Theme";

const SuggestionLayout = () => {
  const [{ theme, isDark }, toggleTheme] = useContext(ThemeContext);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipe = useMealRecipe();

  const fake_results = [
    {
      title: "",
      image: "https://giphy.com/embed/y1ZBcOGOOtlpC",
    },
    {
      title: "",
      image: "https://giphy.com/embed/y1ZBcOGOOtlpC",
    },
    {
      title: "",
      image: "https://giphy.com/embed/y1ZBcOGOOtlpC",
    },
  ];

  const fetchData = async () => {
    setLoading(true);
    const result = await fetchRecipe();
    setTimeout(() => {
      setResults(result.results);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div class="d-flex flex-column">
        {loading ? (
          <SuggestionCard
            array={fake_results}
            loading={loading}
          />
        ) : (
          <SuggestionCard array={results} loading={loading}/>
        )}

        <div className="div_button">
          <Button
            text="Voir d'autres recettes"
            onClick={fetchData}
            color={theme.backgroundColor}
            width="400px"
            loading={loading}
          ></Button>
        </div>
      </div>
    </>
  );
};

export default SuggestionLayout;
