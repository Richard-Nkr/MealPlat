import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProgressBarNutriment = ({number, totalNumber, color, title}) => {

  //Obtient la valeur en pourcentage d'un nombre par rapport à un autre
  const valueInPercentage = (num, totalNum) => {
    return (num*100)/totalNum;
  }
  const pourcent = Math.round(valueInPercentage(number, totalNumber));

    return (
        <>
                <p className="text-white progressTitle">{title}</p>
                <ProgressBar className="progressNut" now={pourcent} label={`${pourcent}%`} variant={color} />
        </>
    )
}





export default ProgressBarNutriment;