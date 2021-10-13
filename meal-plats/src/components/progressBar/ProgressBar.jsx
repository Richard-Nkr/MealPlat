import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProgressBarNutriment({pourcent, color, title}) {
    return (
        <>
            <div className="col-md-2">
                <h5>{title}</h5>
                <ProgressBar now={pourcent} label={`${pourcent}%`}
                variant={color} animated />
            </div>
        </>
    )
}





export default ProgressBarNutriment;