import "./DoughnutChart.css"

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Entete from "../En-tete/En-tete";



const data = {
  labels: ['Maigreur__ : IMC entre 0-18,5', ' Normal:   IMC entre 18,5-24,9', ' Surpoids: IMC entre 24,9-29.9', 'Obésité___:IMC entre 29,9-40', 'Morbide___:IMC entre  40 et +'],
  datasets: [
    {
      label: '# of Votes',
      data: [10, 10, 10, 10, 10],
      backgroundColor: [
        'rgb(102, 204,0)',
        'rgb(76,153,0)',
        'rgb(240, 195,0)',
        'rgb(204, 85,0)',
        'rgb(102, 51,0)',
      ],
      borderColor: [
        'rgb(102, 204,0)',
        'rgb(76,153,0)',
        'rgb(240, 195,0)',
        'rgb(204, 85,0)',
        'rgb(102, 51,0)',
      ],
      borderWidth: 1,
    },
  ],
};

const DoughnutChart = () => {
  return(
    
  <>
  
    
    <div id="camembert">
  
    <Entete phrase="Calculateur d'IMC"></Entete>
    <Doughnut data={data} />
    </div>
    <br />
    <Entete phrase="Merci d'avoir utlisé notre formulaire votre IMC est de "></Entete>
    <p>mm</p>

  </>
  );
};

export default DoughnutChart;