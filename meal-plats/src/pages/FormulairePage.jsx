import Formulaire from '../components/Form/Form';
import Header from '../components/Header/Header';
import CardGroups from '../components/Card_Groups/Card_Groups';
import Footer from '../components/Footer/Footer';
import Entete from '../components/En-tete/En-tete';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

const FormulairePage = () => {

    return (   
            <div>
                <Header/>
                <Entete phrase={"Voici nos 4 programmes suivant votre activité sportive selon nos études"}/>
                <CardGroups/>
                <Formulaire/>
                <br />
                <Footer/>
              </div>
              
          )

}

export default FormulairePage;