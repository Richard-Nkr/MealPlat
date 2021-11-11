import { Card } from "react-bootstrap";
import "./Card_Groups.css";
import {ThemeContext} from '../../Context/Theme';
import {useContext} from "react";


const CardSimple = ({image, title, text}) => {

  const [{ theme, isDark }, toggleTheme] = useContext(ThemeContext);



    return(
        <Card style={{backgroundColor: theme.backgroundColor, color:theme.color }}>
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