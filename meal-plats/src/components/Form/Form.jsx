import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Form.css';
import { useForm, useFormState } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import Entete from "../En-tete/En-tete";





const Formulaire = () => {

const { register, handleSubmit, watch, formState: { errors } } = useForm();


// Afficher les valeurs entrer dans le formulaire 
const onSubmit= (data) => {
    console.log(data);
  
}

    return(

        
        
        <Form id="formulaire" onSubmit={handleSubmit(onSubmit)}>
        <br />
        <br />
        
        <Entete phrase=" Veuillez remplir ce formulaire afin de vous aider dans votre changements !"></Entete>
      
        


        <Form.Group className="mb-3" controlId="formBasicNom">
          <Form.Label>Nom</Form.Label>
          <Form.Control type="text" placeholder="Veuillez entrez votre nom ici  " {...register ('nom', {required:"Vous devez renseigner votre nom"})} />
          
          <ErrorMessage
            errors={errors}
            name="nom"
            render={({ message }) => <span>{message}</span>}
        />

        </Form.Group>   

         <Form.Group className="mb-3" controlId="formBasicPrenom">
          <Form.Label>Prenom</Form.Label>
          <Form.Control type="text" placeholder="Veuillez entrez votre prenom ici"  {...register ('prenom', {required:"Vous devez renseigner votre prenom"})}/>
          
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
          <Form.Control type="number" placeholder="Entrez votre taille ici "  {...register ('taille', {required:"Vous devez renseigner votre taille"})}/>
          
           {/* Affichage du message d'erreur*/}
          <ErrorMessage
            errors={errors}
            name="taille"
            render={({ message }) => <span>{message}</span>}
        />

        </Form.Group>

      
        <Form.Group className="mb-3" controlId="formBasicPoids">
          <Form.Label>Poids</Form.Label>
          <Form.Control type="number" placeholder="Entrez votre poids ici" {...register ('poids', {required:"Vous devez renseigner votre poids"})} />
        
        
          <ErrorMessage
            errors={errors}
            name="poids"
            render={({ message }) => <span>{message}</span>}
        />
        
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAge">
          <Form.Label>Age</Form.Label>
          <Form.Control type="number" placeholder="Entrez votre age ici"  {...register ('age', {required:"Vous devez renseigner votre age"})}  />
        
          <ErrorMessage
            errors={errors}
            name="age"
            render={({ message }) => <span>{message}</span>}
        />
        
        </Form.Group>

        <label htmlFor="sexe">Actvités</label>
        <select id="select" {...register ('sport', {  required: true,   })}>
            <option disabled defaultValue>Choississez en fonction de la fréquence de vos activités </option>
            <option value="aucun">Sédentaire</option>
            <option value="faible">1 à 3 fois par semaine </option>
            <option value="haute">4 à 6 fois par semaine </option>
            <option value="haute">+ de 6 fois par semaine </option>
        </select>

        <br />
        <br />

        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
)
    }

    

export default Formulaire;