import "./style.css";
import Title from "../Title/Title";

const Header = ({ title, text, buttonTitle, color }) => {
  return (
    <>
      <header>
        <div
          class="overlay"
          style={{
            background: color,
          }}
        >
          <a href="#">
            <Title title="MealPlats"></Title>
          </a>
          <h3>{title}</h3>
          <p className="description">{text}</p>
          <button>{buttonTitle}</button>
        </div>
      </header>
    </>
  );
};

export default Header;
