import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import './Form.css';
import { useForm, useFormState } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import IMC_assets from "../../assets/imc.png";
import AlertInformation from '../Alert_Message/Alert_Information';
import Entete from '../En-tete/En-tete';


const Formulaire = () => {

const { register, control, handleSubmit, formState: { errors } } = useForm({
  mode:"onChange"
});
const {isSubmitting,isSubmitSuccessful, isSubmitted } = useFormState({
  control
});

// Afficher les valeurs entrer dans le formulaire apres 2 secondes


const onSubmit= (data) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
        console.log(data);
        
        let sexe = data.sexe;
        let nom = data.nom;
        let prenom = data.prenom

        // Ici on veut la taille en metre  
        let taille = parseInt(data.taille)/100;
        let age = parseInt(data.age);

        let poids = parseInt(data.poids);
        let activite = data.sport;

        let carre = (taille*taille);
        let imc =  (poids / carre); 
        console.log('IMC --> ',imc)
       
         localStorage.setItem('IMC', JSON.stringify(imc));
         localStorage.setItem('Nom', JSON.stringify(nom));
         localStorage.setItem('Prenom', JSON.stringify(prenom));


         // Si l'utilisateur est un homme
         if (sexe == "homme") {
           let calories_H = (13.7516 * poids + 500.33 * taille - 6.7750 *age + 66.479);
           switch(activite) {
            case "aucun":
              let res = calories_H * 1.375;
              let resultat = res.toFixed(2);
              localStorage.setItem('CALORIES', JSON.stringify(resultat));
              console.log(resultat);
              break;
            case "faible":
              let res_faible = calories_H * 1.56;
              let resultat_faible = res_faible.toFixed(2);
              localStorage.setItem('CALORIES', JSON.stringify(resultat_faible));
              console.log(resultat_faible);
              break;
            case "moyen": 
              let res_moyen = calories_H * 1.64;
              let resultat_moyen = res_moyen.toFixed(2);
              localStorage.setItem('CALORIES', JSON.stringify(resultat_moyen));
              console.log(resultat_moyen);
              break;
            case "haute": 
              let res_haute = calories_H * 1.82;
              let resultat_haute = res_haute.toFixed(2);
              localStorage.setItem('CALORIES', JSON.stringify(resultat_haute));
              console.log(resultat_haute);
              break;
           }

           
         }

         else {
          console.log("FEMMMMMMME");
          let calories_F = (9.740 * poids + 184.96 * taille - 4.6756 *age + 655.0955);
          console.log(calories_F);
          switch (activite) {
            case "aucun":
              let res_femme = calories_F * 1.375;
              let resultat_femme = res_femme.toFixed(2);
              localStorage.setItem('CALORIES', JSON.stringify(resultat_femme));
              console.log(resultat_femme);
              break;
            case "faible": 
              let res_femme_faible = calories_F * 1.56;
              let resultat_femme_faible = res_femme_faible.toFixed(2);
              localStorage.setItem('CALORIES', JSON.stringify(resultat_femme_faible));
              console.log(resultat_femme_faible);
              break;
            case "moyen":
              let res_femme_moyen = calories_F * 1.64;
              let resultat_femme_moyen = res_femme_moyen.toFixed(2);
              localStorage.setItem('CALORIES', JSON.stringify(resultat_femme_moyen));
              console.log(resultat_femme_moyen);
              break;
            case "haute": 
              let res_femme_haute = calories_F * 1.82;
              let resultat_femme_haute = res_femme_haute.toFixed(2);
              localStorage.setItem('CALORIES', JSON.stringify(resultat_femme_haute));
              console.log(resultat_femme_haute);
              break; 
             }
         }
        
        
     
        
      }, 2000);
    });
      
}
console.log();


// Sans utilisation de JSON.parse , on utilise cette fonction pour remplacer les guillements des chaines de caractères

const parse_localStorageValue = (x) => {
  let res = x.replace(/"/g,"");
  return res;
}
    return(
       
        <Form id="formulaire" onSubmit={handleSubmit(onSubmit)}>
        <br />
        <br />
              

        <Form.Group className="mb-3" controlId="formBasicNom">

        <Entete phrase={"Veuillez remplir correctement présent le formulaire présent ci-dessous"}/>   
        <br />       



           {/* Affiche l'alert en focntion des données rentrées par l'utilisateur*/}


          {isSubmitSuccessful && <Alert variant="success">
          <Alert.Heading> Validation du fourmlaire</Alert.Heading>
          <p>
            Merci {parse_localStorageValue(localStorage.Nom)} {parse_localStorageValue(localStorage.Prenom)} d'avoir valider vos informations, vous trouverez ci dessous une liste de plat correspondant à votre rythme de vie.
          </p>
        </Alert>}             

          {!isSubmitSuccessful && isSubmitted && <AlertInformation 
          phrase={"Assurez-vous de bien remplir le formulaire afin que MealPlats vous donnent les informations correspondant à votre profil."}
          title={"Echec de l'envoie !"}
          color={"danger"}
          />}

          {!isSubmitSuccessful && !isSubmitted && !isSubmitting && <AlertInformation
          phrase={"Veuillez remplir entièrement ce formulaire avec vos informations afin que nous vous proposions différents plats correspondant à votre profil."}
          title={"Remplissage du formulaire"}
          color={"warning"}
          />} 


          <Form.Label>Nom</Form.Label>
          <Form.Control type="text" placeholder="Veuillez entrez votre nom ici  " {...register ('nom', {required:"Vous devez renseigner votre nom",
          minLength: {
            value: 2,
            message: "Impossible! Votre nom doit comporter au moins 2 caractères." 
          },
          maxLength: {
            value: 25,
            message: "Impossible! Votre nom ne doit pas comporter plus de 25 caractères." 
          }
        
        
        
        })} />
          
          <ErrorMessage
            errors={errors}
            name="nom"
            render={({ message }) => <span>{message}</span>}
        />

          </Form.Group>   

          <Form.Group className="mb-3" controlId="formBasicPrenom">
            <Form.Label>Prenom</Form.Label>
            <Form.Control type="text" placeholder="Veuillez entrez votre prenom ici"  {...register ('prenom', {required:"Vous devez renseigner votre prenom",
            minLength: {
              value: 2,
              message: "Impossible! Votre prénom doit comporter au moins 2 caractères." 
            },
            maxLength: {
              value: 25,
              message: "Impossible! Votre prénom ne doit pas comporter plus de 25 caractères." 
            }
        
          })}/>
            
          </Form.Group>     
          {/* Form.Select ne fonctionne pas, donc on créé un label en html pure*/}
          <label htmlFor="sexe">Sexe</label>
          <select id="select" {...register ('sexe', {  required: true,   })}>
              <option disabled defaultValue>Choissiez votre sexe </option>
              <option value="homme">Homme</option>
              <option value="femme">Femme</option>
          </select>  
          <br />
                  
          <Form.Group className="mb-3" controlId="formBasicTaille">
            <Form.Label>Taille en cm</Form.Label>
            <Form.Control type="number" placeholder="Entrez votre taille ici "  {...register ('taille', { required:'Vous devez entrez une taille',
            max: {
              value: 220,
              message: 'Impossible! Vous ne pouvvez pas faire plus de 2m20. ' 
            },
            min: {
              value: 120,
              message: "Impossible! Vous ne pouvez pas faire moins d'1m20." 
            }
          
        })}/>
          
           {/* Affichage du message d'erreur*/}
          <ErrorMessage
            errors={errors}
            name="taille"
            render={({ message }) => <span>{message}</span>}
        />

          </Form.Group>

        
          <Form.Group className="mb-3" controlId="formBasicPoids">
            <Form.Label>Poids</Form.Label>
            <Form.Control type="number" placeholder="Entrez votre poids ici" {...register ('poids', {required:"Vous devez renseigner votre poids",
              max: {
                value: 200,
                message: 'Impossible! Votre poids ne doit pas dépasser les 200 kilos. ' 
              },

              min: {
                value: 30,
                message: "Impossible! Vous ne devez pas faire moins de 30 kilos." 
              }

           })} />
          
          
            <ErrorMessage
              errors={errors}
              name="poids"
              render={({ message }) => <span>{message}</span>}
          />
        
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAge">
            <Form.Label>Age</Form.Label>
            <Form.Control type="number" placeholder="Entrez votre age ici"  {...register ('age', {required:"Vous devez renseigner votre age",
              max: {
                value: 110,
                message: 'Impossible! Vous ne devez pas avoir plus de 110 ans. ' 
              },
              min: {
                value: 10,
                message: "Impossible! Vous ne devez pas avoir moins de 10 ans." 
              }
          
            })}  />
          
            <ErrorMessage
              errors={errors}
              name="age"
              render={({ message }) => <span>{message}</span>}
          />
          
          </Form.Group>

        <label htmlFor="sexe">Activités</label>
        <select id="select" {...register ('sport', {  required: true,   })}>
            <option disabled defaultValue>Choississez en fonction de la fréquence de vos activités </option>
            <option value="aucun">Sédentaire</option>
            <option value="faible">1 à 3 fois par semaine </option>
            <option value="moyen">4 à 6 fois par semaine </option>
            <option value="haute">+ de 6 fois par semaine </option>
        </select>

        <br />
        <br />

        {/* Si le formulaire est valide alors on affiche une image avec un text*/}
        {isSubmitSuccessful && <div>
          <p id='text_top_image'>Merci d'avoir correctement remplie le formulaire ! Votre IMC est de {localStorage.IMC}</p>
          <img id="IMC_image" src={IMC_assets} alt="Erreur loading image"></img>
                              </div>}

          <br/>
          <br />
                                

        <Button  variant="success"  disabled={isSubmitting} type="submit">
          Envoyer 
        </Button>
      </Form>
)
    }

    

export default Formulaire;