import { Card } from "react-bootstrap";
import { CardGroup } from "react-bootstrap";
import "./Card_Groups.css";

import bureau from "../../assets/bureau.jpg";
import faible from "../../assets/faible.png";
import haute from "../../assets/haute_intensité.jpg";
import tres_haute from "../../assets/tres_haute.jpeg";
import Entete from "../En-tete/En-tete";


const Card_Groups = () => {
    return(
        <CardGroup id="card_group">
            
      

           
  <Card class="card">

    <Card.Img variant="top" id="image" src={bureau} />
    <Card.Body>
      <Card.Title>Sédentaire</Card.Title>
      <Card.Text>
        Vous n'avez principalement pas d'actvité physique et vous ếtes essentiellement en train de travailler dans votre bureau
      </Card.Text>
    </Card.Body>
  </Card>

  <Card class="card">
    <Card.Img variant="top" src={faible} />
    <Card.Body>
      <Card.Title>Faible</Card.Title>
      <Card.Text>
        Vous avez une activité physique légère, avec un rythme d'entrainements variant de 1 à 3 fois maximum par semaine.
      </Card.Text>
    </Card.Body>
  </Card>


  <Card class="card">
    <Card.Img variant="top" src={haute} />
    <Card.Body>
      <Card.Title>Moyen</Card.Title>
      <Card.Text>
      Vous avez une activité physique moyenne, avec un rythme d'entrainements variant de 4 à 6 fois maximum par semaine.
      </Card.Text>
    </Card.Body>
  </Card>


  <Card class="card">
    <Card.Img variant="top" src={tres_haute} />
    <Card.Body>
      <Card.Title>Haute</Card.Title>
      <Card.Text>
      Vous avez une très haute activité physique avec + de 6 entrainements par semaine.
      </Card.Text>
    </Card.Body>
  </Card>
</CardGroup>
    )

}


export default Card_Groups ;