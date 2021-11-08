import { Card } from "react-bootstrap";
import "./Card_Groups.css";

const CardSimple = ({image, title, text}) => {
    return(
        <Card class="card">
        <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title> <h2>{title}</h2></Card.Title>
        <Card.Text>
            {text}
        </Card.Text>
      </Card.Body>
    </Card>

    )

}

export default CardSimple;