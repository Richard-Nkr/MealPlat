import "./style.css";
import * as React from "react";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const SuggestionCard = ({ array }) => {
  const cardInfo = array;

  const renderCard = (card, index) => {
    return (
      <Card style={{ width: "20rem", height: "50px" }}>
        <Card.Img variant="top" src={card.image} />
        <Card.Body>
          <Card.Title>{card.title}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    );
  };

  return <div style={{ display: "flex" }}>{cardInfo.map(renderCard)}</div>;
};

export default SuggestionCard;
