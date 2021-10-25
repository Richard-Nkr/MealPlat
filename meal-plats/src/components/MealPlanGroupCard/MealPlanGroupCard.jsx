import CardGroup from "react-bootstrap/CardGroup";
import MealPlanCard from "../MealPlanCard/MealPlanCard";
import 'bootstrap/dist/css/bootstrap.min.css';

function MealPlanGroupCard({recipe1, recipe2, recipe3}) {
    return (
        <CardGroup>
            <MealPlanCard recipe={recipe1} />
            <MealPlanCard recipe={recipe2} />
            <MealPlanCard recipe={recipe3} />
        </CardGroup>
    )
}


export default MealPlanGroupCard;