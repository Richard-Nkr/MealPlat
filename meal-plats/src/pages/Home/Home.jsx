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
      <div class="d-flex flex-column">
        <div
          className="div1"
          style={{ backgroundColor: theme.background, color: theme.color }}
        >
          <SuggestionLayout />
        </div>

        <ResearchLayout />
        <div className="div2"
          style={{ backgroundColor: theme.background, color: theme.color }}>
          <FlagLayout />
        </div>

        <br></br>
      </div>
    </>
  );
};

export default Home;
