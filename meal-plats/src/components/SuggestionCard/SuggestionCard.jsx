import "./style.css";
import * as React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button2 from "../Button/Button";
import { ThemeContext } from "../../Context/Theme";

const SuggestionCard = ({ array, loading, error=""}) => {
  useEffect(() => {
    
  }, []);
 
  const cardInfo =  array;

  console.log(cardInfo.length);
  const [{ theme, isDark }, toggleTheme] = useContext(ThemeContext);

  const renderCard = (card) => {
    console.log(card);
    return (
      <>
        <Card>
          {loading ? (
            <iframe
              className="img_recipe"
              src="https://giphy.com/embed/y1ZBcOGOOtlpC"
              frameBorder="0"
              class="giphy-embed"
            ></iframe>
          ) : (
            <Card.Img variant="top" src={card.image} />
          )}

          <Card.Body>
            <Card.Title className="card_title">{card.title}</Card.Title>
            <hr></hr>
            <Card.Text>
              {card.nutrition
                ? card.nutrition.nutrients[0].title +
                  " : " +
                  Math.round(card.nutrition.nutrients[0].amount) +
                  card.nutrition.nutrients[0].unit
                : ""}
              <br></br>
              {card.nutrition
                ? card.nutrition.nutrients[1].title +
                  " : " +
                  Math.round(card.nutrition.nutrients[1].amount) +
                  card.nutrition.nutrients[1].unit
                : ""}
            </Card.Text>
            {loading ? (
              ""
            ) : (
              <Link to={"/recipe/card/" + card.id}>
                <Button2
                  text="Voir la recette"
                  className="btn"
                  color={theme.backgroundColor}
                  width="280px"
                >
                  Voir la recette
                </Button2>
              </Link>
            )}
          </Card.Body>
        </Card>
      </>
    );
  };

  return (
    <div style={{ display: "flex" }}>
      {cardInfo.length != 0 ? (
        cardInfo.map(renderCard)
      ) : (
        <div style={{ marginTop:"5%",height: "500px", color: "black", width: "100%", fontSize:"20px" }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default SuggestionCard;
