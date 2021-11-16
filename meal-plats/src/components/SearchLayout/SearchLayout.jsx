import "./style.css";
import { useState, useEffect, useContext } from "react";
import useMealRecipeByQuery from "../../hooks/useMealRecipeByQuery";
import { ThemeContext } from "../../Context/Theme";
import SuggestionCard from "../SuggestionCard/SuggestionCard";

const SearchLayout = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const fetchRecipe = useMealRecipeByQuery();

  const [values, setValues] = useState("");

  const fetchData = async (e) => {
    setLoading(true);
    e.preventDefault();
    const result = await fetchRecipe(values);
    setTimeout(() => {
      setResults(result);
      setLoading(false);
    }, 1500);

    console.log(result);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setValues(value);
  };

  return (
    <>
      <form id="search_form" onSubmit={fetchData}>
        <input
          type="text"
          name="query"
          value={values}
          onChange={handleInputChange}
          placeholder="Type to Search..."
        />
        <input type="submit" value="Rechercher" class="" />
      </form>
      <SuggestionCard array={results} loading={loading}></SuggestionCard>
    </>
  );
};

export default SearchLayout;
