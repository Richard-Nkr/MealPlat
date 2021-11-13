import "./style.css";
import { useState, useEffect, useContext } from "react";
import useRecipeByCuisine from "../../hooks/useRecipeByCuisine";
import SuggestionCard from "../SuggestionCard/SuggestionCard";
import { ThemeContext } from "../../Context/Theme";

const FlagLayout = () => {
  const [{ theme, isDark }, toggleTheme] = useContext(ThemeContext);

  const [results, setResults] = useState([]);

  const fetchRecipe = useRecipeByCuisine();

  const fetchData = async (e) => {
    const country = e.target.alt;
    console.log(country);
    const result = await fetchRecipe(country);
    setResults(result.results);
  };
  return (
    <>
      <h2>Choisis une spécialité</h2>

      <div class="d-flex flex-nowrap">
        <figure>
          <img
            style={{ boxShadow: theme.boxShadow }}
            src="http://www.geognos.com/api/en/countries/flag/FR.png"
            className="flag"
            alt="French"
            onClick={fetchData}
          />
          <figcaption className="country_name">Française</figcaption>
        </figure>
        <figure>
          <img
            style={{ boxShadow: theme.boxShadow }}
            src="http://www.geognos.com/api/en/countries/flag/IN.png"
            className="flag"
            alt="Indian"
            onClick={fetchData}
          />
          <figcaption className="country_name">Indienne</figcaption>
        </figure>
        <figure>
          <img
            style={{ boxShadow: theme.boxShadow }}
            src="http://www.geognos.com/api/en/countries/flag/ES.png"
            className="flag"
            alt="Spanish"
            onClick={fetchData}
          />
          <figcaption className="country_name">Espagnole</figcaption>
        </figure>
        <figure>
          <img
            style={{ boxShadow: theme.boxShadow }}
            src="http://www.geognos.com/api/en/countries/flag/CN.png"
            className="flag"
            alt="Chinese"
            onClick={fetchData}
          />
          <figcaption className="country_name">Chinoise</figcaption>
        </figure>
        <figure>
          <img
            style={{ boxShadow: theme.boxShadow }}
            src="http://www.geognos.com/api/en/countries/flag/US.png"
            className="flag"
            alt="American"
            onClick={fetchData}
          />
          <figcaption className="country_name">Américaine</figcaption>
        </figure>
        <figure>
          <img
            style={{ boxShadow: theme.boxShadow }}
            src="http://www.geognos.com/api/en/countries/flag/IT.png"
            className="flag"
            alt="Italian"
            onClick={fetchData}
          />
          <figcaption className="country_name">Italienne</figcaption>
        </figure>
        <figure>
          <img
            style={{ boxShadow: theme.boxShadow }}
            src="http://www.geognos.com/api/en/countries/flag/JP.png"
            className="flag"
            alt="Japanese"
            onClick={fetchData}
          />
          <figcaption className="country_name">Japonaise</figcaption>
        </figure>
      </div>
      <div className="d-flex flex-column">
        <SuggestionCard array={results}></SuggestionCard>
      </div>
    </>
  );
};

export default FlagLayout;
