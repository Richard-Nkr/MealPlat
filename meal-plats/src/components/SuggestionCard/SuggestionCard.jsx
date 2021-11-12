import "./style.css";
import * as React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const SuggestionCard = ({ array }) => {
  const cardInfo = array;

  const renderCard = (card, index) => {
    return (
      <Card style={{ width: "20rem", height: "50px" }}>
        <Card.Img variant="top" src={card.image} />
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
          <Link to={"/recipe/card/" + card.id}>
            {" "}
            <Button variant="primary">Voir la recette</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  };
  return <div style={{ display: "flex" }}>{cardInfo.map(renderCard)}</div>;
};

export default SuggestionCard;
