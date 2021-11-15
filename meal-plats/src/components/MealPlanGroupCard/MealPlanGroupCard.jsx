import MealPlanCard from "../MealPlanCard/MealPlanCard";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col} from "react-bootstrap";
import "../../styles/_card.css"; 
import Alert from 'react-bootstrap/Alert'

function MealPlanGroupCard({breakfast, lunch, dinner, breakfastReload, lunchReload, dinnerReload, brLoad, luLoad, diLoad}) {

    //Alerte s'il n'y a pas de recette
    if(!breakfast && !lunch && !dinner){
        return (
            <>
                <Alert variant="danger text-center mt-2">
                    Désolé vous n'avons aucunes recettes pour vous, vérifiez qu'il vous reste des crédits API ou que vos calories sont cohérents
                </Alert>
            </>
        )
    }
    
    return (
    <Row className='row-cols-1 row-cols-md-3 g-4'>
        {breakfast && 
        <Col>
            <MealPlanCard recipe={breakfast} type="breackfast" onReload={breakfastReload} load={brLoad} />
        </Col>
        }
        {lunch && 
        <Col>
            <MealPlanCard recipe={lunch} type="Lunch" onReload={lunchReload} load= {luLoad} />
        </Col>
        }
        {dinner && 
        <Col>
            <MealPlanCard recipe={dinner} type="Dinner" onReload={dinnerReload} load= {diLoad}/>
        </Col>
        }
    </Row>
    )
}


export default MealPlanGroupCard;