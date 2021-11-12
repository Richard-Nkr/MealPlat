import "./style.css";
import { useState, useEffect, useContext } from "react";
import useRecipeByCuisine from "../../hooks/useRecipeByCuisine";
import SuggestionCard from "../SuggestionCard/SuggestionCard";

const FlagLayout = () => {
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
      <div className="container">
        <div className="left_box">
          <figure>
            <img
              src="http://www.geognos.com/api/en/countries/flag/FR.png"
              className="flag"
              alt="French"
              onClick={fetchData}
            />
            <figcaption className="country_name">Française</figcaption>
          </figure>
          <figure>
            <img
              src="http://www.geognos.com/api/en/countries/flag/IN.png"
              className="flag"
              alt="Indian"
              onClick={fetchData}
            />
            <figcaption className="country_name">Indienne</figcaption>
          </figure>
          <figure>
            <img
              src="http://www.geognos.com/api/en/countries/flag/ES.png"
              className="flag"
              alt="Spanish"
              onClick={fetchData}
            />
            <figcaption className="country_name">Espagnole</figcaption>
          </figure>
          <figure>
            <img
              src="http://www.geognos.com/api/en/countries/flag/CN.png"
              className="flag"
              alt="Chinese"
              onClick={fetchData}
            />
            <figcaption className="country_name">Chinoise</figcaption>
          </figure>
          <figure>
            <img
              src="http://www.geognos.com/api/en/countries/flag/US.png"
              className="flag"
              alt="American"
              onClick={fetchData}
            />
            <figcaption className="country_name">Américaine</figcaption>
          </figure>
          <figure>
            <img
              src="http://www.geognos.com/api/en/countries/flag/MX.png"
              className="flag"
              alt="Mexican"
              onClick={fetchData}
            />
            <figcaption className="country_name">Méxicaine</figcaption>
          </figure>
          <figure>
            <img
              src="http://www.geognos.com/api/en/countries/flag/IT.png"
              className="flag"
              alt="Italian"
              onClick={fetchData}
            />
            <figcaption className="country_name">Italienne</figcaption>
          </figure>
        </div>
        <div className="right_box">
          <SuggestionCard array={results}></SuggestionCard>
        </div>
      </div>
    </>
  );
};

export default FlagLayout;
