import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import {Row, Col} from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner'

function MealPlanCard({recipe, type, onReload, load}) {
    const divStyle = {
        width: null,
        resizeMode: 'contain',
        height: 220
      };


      const deleteHTMLTag = (str) => {
        var stripedHtml = str.replace(/<[^>]+>/g, '');
        return stripedHtml;
     }

      recipe.summary = deleteHTMLTag(recipe.summary);
      <Row className="align-items-center justify-content-center h-100 bg-primary">
                    <Spinner animation="border" />
                </Row>

      return (
        
        <Card className={`h-100 position-relative ${load && 'transparent'}`}>
            <>
                {load && <Spinner animation="border" className="absolute-center" style={'opacity: 0.7'} /> }
                <Card.Header>{type}</Card.Header>
                <Card.Img variant="top" src={recipe.image} style={divStyle}/>
                <Card.Body>
                    <Card.Title>{recipe.title}</Card.Title>
                    <Card.Text>
                        {recipe.summary.substring(0, 150)+" [...]"}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                <Row className="justify-content-between">
                    <Col md="5"><Button variant="success">Voir la recette</Button></Col>
                    <Col md="2">
                        <button className="reload" onClick={onReload}>
                            <FontAwesomeIcon icon={faSyncAlt} />
                        </button>
                    </Col>
                </Row>
                </Card.Footer>
            </> 
        </Card>
)

    /*return (
            <Card className="h-100">
                <Card.Header></Card.Header>
                <Card.Img variant="top" src={recipe.image} style={divStyle}/>
                <Card.Body>
                    <Card.Title>{recipe.title}</Card.Title>
                    <Card.Text>
                        {recipe.summary}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                <Row className="justify-content-between">
                    <Col md="5"><Button variant="success">Voir la recette</Button></Col>
                    <Col md="2"><img src={refreshIcon} alt="Logo" class="float-right"/></Col>
                </Row>
                </Card.Footer>
            </Card>
    )*/
}


export default MealPlanCard;