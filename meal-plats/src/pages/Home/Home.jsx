import { useContext } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import SuggestionLayout from "../../components/SuggestionLayout/SuggestionLayout";
import FlagLayout from "../../components/FlagLayout/FlagLayout";
import ResearchLayout from "../../components/ResearchLayout/ResearchLayout";
import Header from "../../components/Header/Header";
import { constants } from "../../constants";
import { ThemeContext } from "../../Context/Theme";

const Home = () => {
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
        <button type="button" onClick={toggleTheme}>
          {isDark ? (
            <BsFillSunFill size={25} color="rgb(255, 228, 54)" />
          ) : (
            <BsFillMoonFill size={25} color="royalblue" />
          )}
        </button>

        <Header
          title="Qui sommes-nous ?"
          text="MealPlats est une application web dans laquelle vous pourrez retrouver des milliers de recettes."
          buttonTitle="DECOUVRIR"
          color={theme.background}
        ></Header>
        <br></br>
        <SuggestionLayout />
        {/* <div className="droite">
        <ResearchLayout />
      </div>*/}
        <div className="bas">
          <ResearchLayout />
          <FlagLayout />
        </div>
        <br></br>
      </div>
    </>
  );
};

export default Home;
