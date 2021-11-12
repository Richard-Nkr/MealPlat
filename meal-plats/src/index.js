import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import FormulairePage from "./pages/FormulairePage";
import {ThemeProvider} from "./Context/Theme";
import MealPlan from "../src/pages/MealPlan/";


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
    <FormulairePage/>
    <MealPlan />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
