import { useContext } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import SuggestionLayout from "../../components/SuggestionLayout/SuggestionLayout";
import FlagLayout from "../../components/FlagLayout/FlagLayout";
import ResearchLayout from "../../components/ResearchLayout/ResearchLayout";
import Navbar from "../../components/Navbar/Navbar";
import { constants } from "../../constants";
import { ThemeContext } from "../../Context/Theme";

const Home = () => {
  const [{ theme, isDark }, toggleTheme] = useContext(ThemeContext);
  return (
    <>
      <Navbar />
      <div
        class="d-flex flex-column"
        className="center"
        style={{ width: "50%" }}
      >
        <div
          className="div10"
          style={{ backgroundColor: theme.background, color: theme.color }}
        >
          <h2 style={{ color: theme.color }}> Idées de recette </h2>
          <SuggestionLayout />
        </div>

        <div
          className="div11"
          style={{ backgroundColor: theme.background, color: theme.color }}
        >
          <h2 style={{ color: theme.color }}>Choix d'une spécialitée</h2>
          <FlagLayout />
        </div>

        <br></br>
      </div>
    </>
  );
};

export default Home;
