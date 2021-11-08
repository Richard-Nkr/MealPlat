
import Alert from 'react-bootstrap/Alert';

const AlertInformation = ({phrase, title,color}) => {
  
    return(
        <Alert variant={color}>
    <Alert.Heading> <p> {title}</p> </Alert.Heading>
    <p>
      {phrase}
    </p>
  </Alert>
    )
}

export default AlertInformation