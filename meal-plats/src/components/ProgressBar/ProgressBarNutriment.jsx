import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProgressBarNutriment = ({number, totalNumber, totalcal, color, title}) => {

  //Obtient la valeur en pourcentage d'un nombre par rapport à un autre
  const valueInPercentage = (num, totalNum) => {
    return (num*100)/totalNum;
  }
  const pourcent = Math.round(valueInPercentage(number, totalNumber));

    return (
        <>
                <h5>{title}</h5>
                <ProgressBar now={pourcent} label={`${pourcent}%`}
                variant={color} animated />
        </>
    )
}





export default ProgressBarNutriment;