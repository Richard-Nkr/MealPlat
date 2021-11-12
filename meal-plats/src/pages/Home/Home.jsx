import { useContext } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import SuggestionLayout from "../../components/SuggestionLayout/SuggestionLayout";
import FlagLayout from "../../components/FlagLayout/FlagLayout";
import ResearchLayout from "../../components/ResearchLayout/ResearchLayout";
import Header from "../../components/Header/Header";
import { ThemeContext } from "../../providers/Theme/context";
import { constants } from "../../constants";

const Home = () => {
  const theme = useContext(ThemeContext);
  return (
    <>
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
    </>
  );
};

export default Home;
