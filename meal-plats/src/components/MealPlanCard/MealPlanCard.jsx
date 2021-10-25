import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import refreshIcon from '../../asset/refresh.png';
import {Row, Col} from "react-bootstrap";

function MealPlanCard({recipe}) {
    const divStyle = {
        width: null,
        resizeMode: 'contain',
        height: 220
      };

    return (
            <Card>
                <Card.Header>{recipe.type}</Card.Header>
                <Card.Img variant="top" src={recipe.img} style={divStyle}/>
                <Card.Body>
                    <Card.Title>{recipe.title}</Card.Title>
                    <Card.Text>
                        {recipe.description}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                <Row>
                    <Col md={5}><Button variant="success">Voir la recette</Button></Col>
                    <Col md={{ span: 2, offset: 5 }}><img src={refreshIcon} alt="Logo" class="float-right"/></Col>
                </Row>
                </Card.Footer>
            </Card>
    )
}


export default MealPlanCard;