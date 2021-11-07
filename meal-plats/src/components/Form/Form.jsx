import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import './Form.css';
import { useForm, useFormState } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import IMC_assets from "../../assets/imc.png";
import Alert_Information from '../Alert_Message/Alert_Information';
import Spinner from 'react-bootstrap/Spinner'








const Formulaire = () => {

const { register, control, handleSubmit, formState: { errors } } = useForm({
  mode:"onChange"
});
const {isSubmitting,isSubmitSuccessful } = useFormState({
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
        
        
     
        
      }, 2000);
    });
      
}

// Sans utilisation de JSON.parse , on utilise cette fonction pour remplacer les guillements des chaines de caractères

const parse_nom = localStorage.Nom.replace(/"/g,"");
const parse_prenom  = localStorage.Prenom.replace(/"/g,"");


    return(

        
        
        <Form id="formulaire" onSubmit={handleSubmit(onSubmit)}>
        <br />
        <br />
              

        <Form.Group className="mb-3" controlId="formBasicNom">

       {isSubmitSuccessful && <Alert variant="success">
          <Alert.Heading> Validation du fourmlaire</Alert.Heading>
          <p>
            Merci {parse_nom} {parse_prenom} d'avoir valider vos informations, vous trouverez ci dessous une liste de plat correspondant à votre rythme de vie.
          </p>
        </Alert>} 

          {!isSubmitSuccessful && <Alert_Information/>} 


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
            
            <ErrorMessage
              errors={errors}
              name="prenom"
              render={({ message }) => <span>{message}</span>}
          />


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
            <option value="haute">4 à 6 fois par semaine </option>
            <option value="haute">+ de 6 fois par semaine </option>
        </select>

        <br />
        <br />

       
        {isSubmitSuccessful && <div>
          <p id='text_top_image'>Merci d'avoir correctement remplie le formulaire!Votre IMC est de {localStorage.IMC}</p>
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