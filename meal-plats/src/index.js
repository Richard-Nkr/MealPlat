import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import Formulaire from './components/Form/Form';
import Header from './components/Header/Header';
import CardGroups from './components/Card_Groups/Card_Groups';
import Footer from './components/Footer/Footer';
import Entete from './components/En-tete/En-tete'


ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Entete phrase={"Voici nos 4 programmes suivant votre activité sportive selon nos études"}/>
    <CardGroups/>
    <Formulaire/>
    <Footer/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
