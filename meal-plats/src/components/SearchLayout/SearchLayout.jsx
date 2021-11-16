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
    console.log('POPOPO');
    setLoading(true);
    // Certaines actions s'exécutent par défaut lors de la récupération d'évènement. le preventDefault les empêche de se déclencher.
    e.preventDefault();
    const result = await fetchRecipe(values);
    setTimeout(() => {
      setResults(result);
      setLoading(false);
    }, 2500);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setValues(value);
  };


  return (
    <>
      <form id="search_form" onSubmit={fetchData}>
        <input
          type="text"
          value={values}
          onChange={handleInputChange}
          placeholder="sugar,cheese,pasta..."
        />
        <input type="submit" value="Rechercher" class="" />
      </form>

      
      {loading ? 
       <><div class="lds-ring"><div></div><div></div><div></div><div></div></div><h3>Recettes en cours de recherche...</h3></>
      :  <SuggestionCard array={results} loading={loading} error="Recettes indisponibles !"/>}

  
        

     
    
     
    </>
  );
};


export default SearchLayout;
