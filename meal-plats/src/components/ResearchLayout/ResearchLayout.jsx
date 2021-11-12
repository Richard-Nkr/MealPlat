import "./style.css";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useMealRecipe from "../../hooks/useMealRecipe";
import Circle from "../Circle/Circle";
import Header from "../Header/Header";
import SuggestionCard from "../SuggestionCard/SuggestionCard";
import { cuisines } from "../../utils/cuisines";

const ResearchLayout = () => {
  const initialValues = {
    query: "",
  };

  const [datas, setDatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);

  const [values, setValues] = useState(initialValues);

  const [checkedState, setCheckedState] = useState(
    new Array(cuisines.length).fill(false)
  );

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setDatas(json));
  });

  const handleSearchTerm = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (let i = 0; i < checkedState.length; i++) {
      if (checkedState[i]) {
        console.log(cuisines[i]);
      }
    }

    const ingredients = values.query.split();
    console.log(ingredients);
  };

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((checked, index) =>
      index == position ? !checked : checked
    );
    console.log(updatedCheckedState);
    setCheckedState(updatedCheckedState);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          value={values.query}
          onChange={handleInputChange}
        />

        {/*
        <label>
          Calories max :
          <input type="range" id="vol" name="vol" min="0" max="50" />
        </label>
        <input
          type="text"
          name="search"
          id="searchBar"
          placeholder="Cuisine"
          onChange={handleSearchTerm}
        ></input>
        <div className="searchResults">
          datas
          .filter((val) => {
            return val.title.includes(searchTerm);
          })
          .map((post) => {
            return (
              <div className="searchResults" key={post.id}>
                {post.title}
              </div>
            );
          })*/}
        <div className="searchResult">Data</div>

        <div id="checkboxes">
          <label>some label</label>
          <ul className="toppings-list">
            {cuisines.map(({ name }, index) => {
              return (
                <li key={index}>
                  <div className="">
                    <div className="left-section">
                      <label>
                        <input
                          type="checkbox"
                          name={name}
                          value={name}
                          checked={checkedState[index]}
                          onChange={() => handleOnChange(index)}
                        />
                        {name}
                      </label>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <input type="submit" value="Envoyer" />
      </form>
    </>
  );
};

export default ResearchLayout;
