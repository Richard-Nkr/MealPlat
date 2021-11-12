import "./style.css";
import Title from "../Title/Title";
import { Link } from "react-router-dom";
import { constants } from "../../constants";

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
            <Link to={constants.PATHS.HOME}>MEALPLAT</Link> <br></br>
          </a>
          <Link to={constants.PATHS.MEAL_PLAN}>MEALPLAN</Link> <br></br>
          <Link to={constants.PATHS.FORM}>FORM</Link>
          <p className="description">{text}</p>
          <button>{buttonTitle}</button>
        </div>
      </header>
    </>
  );
};

export default Header;
