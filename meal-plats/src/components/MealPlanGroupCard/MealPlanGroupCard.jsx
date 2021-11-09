import MealPlanCard from "../MealPlanCard/MealPlanCard";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col} from "react-bootstrap";
import "../../styles/_card.css"; 

function MealPlanGroupCard({breakfast, lunch, dinner, breakfastReload, lunchReload, dinnerReload, brLoad, luLoad, diLoad}) {

    return (
    <Row className='row-cols-1 row-cols-md-3 g-4'>
        {breakfast && 
        <Col>
            <MealPlanCard recipe={breakfast} type="Breakfast" onReload={breakfastReload} load= {brLoad} />
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