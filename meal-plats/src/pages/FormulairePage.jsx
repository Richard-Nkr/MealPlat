import Formulaire from '../components/Form/Form';
import Header from '../components/Header/Header';
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import Footer from '../components/Footer/Footer';
import Entete from "../components/En-tete/En-tete";
import CardGroups from "../components/Card_Groups/Card_Groups";
import CardSimple from '../components/Card_Groups/Card_SImple';
import {ThemeContext} from '../Context/Theme';
import {useContext} from "react";

import "./FormulairePage.css"



const FormulairePage = () => {

    const [{ theme, isDark }, toggleTheme] = useContext(ThemeContext);
  return (
    <div
      className="app"
      style={{ backgroundColor: theme.backgroundColor, color: theme.color, background:theme.background }}
    >
     <Header/>
      <button type="button" onClick={toggleTheme}>
      {isDark ?  <BsFillSunFill size={25} color="rgb(255, 228, 54)"/> : <BsFillMoonFill size={25} color="royalblue"/> }
      </button>
     

      <Entete phrase={"Bienvenue sur notre application Mealplat"}/>

      <CardGroups/>

     
     

  

      <Formulaire/>

    <br />     

      <Footer/>

  
       
    </div>
   
  );
};

export default FormulairePage;