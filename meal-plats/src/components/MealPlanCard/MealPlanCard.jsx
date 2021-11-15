import React from 'react';
import { useState } from 'react';
import { BsClock, BsBook, BsPerson, BsArrowRepeat } from 'react-icons/bs';
import Spinner from 'react-bootstrap/Spinner'
import { Link } from "react-router-dom";


const MealPlanCard = ({recipe, type, onReload, load}) => {

    const [textOpen, setTextOpen] = useState(false);

    const {extendedIngredients} = recipe;

    const deleteHTMLTag = (str) => {
        var stripedHtml = str.replace(/<[^>]+>/g, '');
        return stripedHtml;
     }

    recipe.summary = deleteHTMLTag(recipe.summary);

    return (

        <div className={`${!recipe.load && "slide-top"} ft-recipe`} >
            
            <button className="reload" onClick={recipe.onReload}>
                <BsArrowRepeat size="20"/>
            </button>

            <div className="ft-recipe__thumb" onClick={() => setTextOpen(!textOpen)} >
                {recipe.load &&
                    <div className="h-100 w-100 d-flex justify-content-center align-items-center position-absolute transparent">
                        <Spinner animation="border" className="spinner-lg" variant="light" /> 
                    </div> 
                }
                <h3>{recipe.type}</h3>
                <img src={recipe.image} alt="Strawberry Waffle" />
            </div>

            {textOpen &&
                <div className="ft-recipe__content">
                    <header className="content__header">
                        <div className="row-wrapper">
                            <h3 className="recipe-title">{recipe.title}</h3>
                            <div className="user-rating"></div>
                        </div>
                        <ul className="recipe-details">
                            <li className="recipe-details-item time"><BsClock size="32" /><span className="value">{recipe.readyInMinutes}</span><span className="title">Minutes</span></li>
                            <li className="recipe-details-item ingredients"><BsBook size="32" /><span className="value">{Object.keys(extendedIngredients).length}</span><span className="title">Ingredients</span></li>
                            <li className="recipe-details-item servings"><BsPerson size="32" /> <span className="value">{recipe.servings}</span><span className="title">Personnes</span></li>
                        </ul>
                    </header>
                    <p className="description">
                        {recipe.summary.substring(0, 150)+"..."}</p>
                    <footer className="content__footer"><Link to={"/recipe/card/" + recipe.id}>Voir la recette</Link></footer>
                </div>
            }
        </div>
    );
};

export default MealPlanCard;