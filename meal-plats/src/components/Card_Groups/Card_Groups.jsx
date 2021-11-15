import { CardGroup } from "react-bootstrap";
import "./Card_Groups.css";
import bureau from "../../assets/bureau.jpg";
import faible from "../../assets/faible.png";
import haute from "../../assets/haute_intensité.jpg";
import tres_haute from "../../assets/tres_haute.jpeg";
import CardSimple from "./Card_SImple";





const CardGroups = () => {




    return(
       
        
      <CardGroup id="card_group">
          
        <CardSimple
        image={bureau}
        text={"Vous n'avez principalement pas d'actvité physique et vous ếtes essentiellement en train de travailler dans votre bureau"}
        title={"Sédentaire"}
       
        />

    <CardSimple
        image={faible}
        text={"Vous avez une activité physique légère, avec un rythme d'entrainements variant de 1 à 3 fois maximum par semaine."}
        title={"Faible"}
        />

    <CardSimple
        image={haute}
        text={"Vous avez une activité physique moyenne, avec un rythme d'entrainements variant de 4 à 6 fois maximum par semaine."}
        title={"Moyen"}
        />

    <CardSimple
        image={tres_haute}
        text={"Vous avez une très haute activité physique avec + de 6 entrainements par semaine"}
        title={"Haute"}
        />

      
  </CardGroup>
    )

}


export default CardGroups ;