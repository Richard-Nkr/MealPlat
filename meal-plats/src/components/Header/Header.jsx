import "./Header.css";
import Title from "../Title/Title"

const Header = ({ 
    title = " Formulaire ", 
    text =" Veuillez renseigner les données présentes dans le formulaires afin de vous donner un ensemble de plats correspondants à votre morphologie et vos objectifs"
}) => {
  return (
    <>
      <header>
        <div class="overlay">
          <Title title="MealPlats"></Title>
          <h2>{title}</h2>
          <p>{text}</p>        
        </div>
        <br/>
      </header>
    </>
  );
};

export default Header;