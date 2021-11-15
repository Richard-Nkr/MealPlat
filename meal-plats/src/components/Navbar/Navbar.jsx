import { useContext } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { constants } from "../../constants";
import { ThemeContext } from "../../Context/Theme";

const Navbar = () => {
  const [{ theme, isDark }, toggleTheme] = useContext(ThemeContext);

  return (
    <>
      <div
        className="app"
        style={{
          backgroundColor: theme.backgroundColor,
          color: theme.color,
          background: theme.background,
        }}
      >
        <nav style={{ backgroundColor: theme.backgroundColor }} class="blend">
          <ul>
            <li>
              {" "}
              <button type="button"  id="Navbar_Button" onClick={toggleTheme}>
                {isDark ? (
                  <BsFillSunFill size={25} color="rgb(255, 228, 54)" />
                ) : (
                  <BsFillMoonFill size={25} color="royalblue" />
                )}
              </button>
            </li>

            <li>
              <a href="#">
                <Link to={constants.PATHS.HOME}>
                  <img src="https://img.icons8.com/windows/64/000000/home.png" />
                  <br></br>
                  <br></br>
                  <br></br>MEALPLAT
                </Link>
              </a>
            </li>
            <li>
              <a href="#">
                <Link to={constants.PATHS.MEAL_PLAN}>
                  <img src="https://img.icons8.com/ios-filled/64/000000/meal.png" />
                  <br></br>
                  <br></br>
                  <br></br>
                  MEALPLAN
                </Link>
              </a>
            </li>
            <li>
              <a href="#">
                <Link to={constants.PATHS.FORM}>
                  <img src="https://img.icons8.com/wired/64/000000/form.png" />
                  <br></br>
                  <br></br>
                  <br></br>
                  FORMULAIRE
                </Link>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
