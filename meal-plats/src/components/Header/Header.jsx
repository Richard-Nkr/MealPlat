import "./style.css";
import Title from "../Title/Title";

const Header = ({ title, text, buttonTitle }) => {
  return (
    <>
      <header>
        <div class="overlay">
          <h1></h1>
          <Title title="MealPlats"></Title>
          <h3>{title}</h3>
          <p>{text}</p>

          <button>{buttonTitle}</button>
        </div>
      </header>
    </>
  );
};

export default Header;
