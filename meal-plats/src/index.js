import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import Formulaire from './components/Form/Form';
import Header from './components/Header/Header';
import Circle from './components/Circle/Circle';
import Card_Groups from './components/Card_Groups/Card_Groups';
import Footer from './components/Footer/Footer';


ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Card_Groups/>
    <Formulaire/>
    <Footer/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
