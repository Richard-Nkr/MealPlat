import React from "react";
import MealPlanGroupCard from "../components/MealPlanGroupCard/MealPlanGroupCard";
import ProgressBarNutriment from "../components/ProgressBar/ProgressBarNutriment";
import { Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Circle from "../components/Circle/Circle";
import "../styles/mealPlan.css";
import { BsArrowBarUp, BsArrowBarDown } from "react-icons/bs";
import Navbar from "../components/Navbar/Navbar";
import Alert from 'react-bootstrap/Alert'

const MealPlan = () => {
  //TODO : vérifier les cal parcque bug

  /*Needed nutriments*/
  const [neededKcal, setNeededKcal] = useState(0);
  const [neededNutriments, setNeededNutriments] = useState({});

  /*Is Loading variable */
  const [brIsLoading, setBrLoad] = useState(false);
  const [luIsLoading, setLuLoad] = useState(false);
  const [diIsLoading, setDiLoad] = useState(false);

  /*Total nutriments in recipes*/
  const [totalKcal, setTotalKcal] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalCarb, setTotalCarb] = useState(0);
  const [totalFat, setTotalFat] = useState(0);

  /*Recipes*/
  const [breakfast, setBreakfast] = useState(null);
  const [lunch, setLunch] = useState(null);
  const [dinner, setDinner] = useState(null);

  /*Showing progressBar */
  const [progressBarIsOpen, setProgressBarIsOpen] = useState(true);

  useEffect(() => {
    const storageCal = localStorage.getItem('CALORIES')
    if (storageCal) {
      setNeededKcal(storageCal);
      setNeededNutriments(neededNutrimentsPerCalorie(storageCal));
    }
  }, []);

  useEffect(() => {
    showRecipes();
  }, [neededKcal]);

  //Lorsque qu'une recette change : recalculer les nutriments
  useEffect(() => {
    if (lunch && breakfast && dinner) reloadProgressBar();
  }, [breakfast, lunch, dinner]);

  const constructRecipeQuery = (type, totalcal) => {
    //Recupere les informations nutritionelles neccesaires par repas, pour construire notre requête API
    const nutritionalInfos = allNutritionalInfoPerRecipeType(type, totalcal);

    const { calories } = nutritionalInfos;
    const { nutriments } = nutritionalInfos;

    const myApi = "90c3676dd91647f7926fb16833153b75";
    const richardApi = "775d6e05bc704ca4a9d20a064595cc15";
    const zuanliApi = "0a75600e2ffc40a7b0f1ca1f6591bdbe";
    const otherApi = "debbfcabab43435f91fca421791c032d";

    const baseQuery =
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=debbfcabab43435f91fca421791c032d"; // a changer

    if (type !== "breakfast") type = "main course"; // car type Dinner ou Lunch n'existe pas dans l'API

    //Fonctionne comme un string builder
    const html = [];
    html.push(
      baseQuery,
      "&type=",
      type,
      addCalorieQuery(calories.minCalorie, calories.maxCalorie),
      addProteinQuery(nutriments.minProtein, nutriments.maxProtein),
      addFatQuery(nutriments.minFat, nutriments.maxFat),
      addCarbQuery(nutriments.minCarb, nutriments.maxCarb),
      "&addRecipeInformation=true",
      "&fillIngredients=true",
      "&number=10"
    );

    return html.join("");
  };

  //Retourne un objet contenant le nombre de calories et de nutriments neccessaires par type de repas (utile pour construire notre requête API)
  const allNutritionalInfoPerRecipeType = (type, totalKcal) => {
    const cal = neededCaloriePerRecipeType(type, totalKcal);
    const nutriments = neededNutrimentsPerCalorie(cal.maxCalorie);

    const recipeInformation = {
      calories: cal,
      nutriments: nutriments,
    };

    return recipeInformation;
  };

  //Calcule le nombre de calories neccessaires par type de repas (breakfast, lunch, dinner)
  const neededCaloriePerRecipeType = (type, totalKcal) => {
    //Le déjeuner doit représenter 25% du total calorique journalier
    const breakfastPercent = 25;
    const lunchPercent = 40;
    const dinnerPercent = 35;
    const margePercent = 50;

    var maxCalorie = 0;

    switch (type) {
      case "breakfast":
        maxCalorie = pourcentage(breakfastPercent, totalKcal);
        break;
      case "lunch":
        maxCalorie = pourcentage(lunchPercent, totalKcal);
        break;
      case "dinner":
        maxCalorie = pourcentage(dinnerPercent, totalKcal);
        break;
      default:
        console.log(`Le type ${type} ne fait pas partie de la liste.`);
    }

    const minCalorie = reducationPourcentage(maxCalorie, margePercent);

    return {
      maxCalorie: maxCalorie,
      minCalorie: minCalorie,
    };
  };

  //Calcule les nutriments neccessaires (proteines, glucides, lipides) en fonction d'un total calorique
  const neededNutrimentsPerCalorie = (kcal) => {
    //Le nombre de glucide (en calorie) doit représenter 50% des calories d'un repas équilibré
    const glucidePercent = 50;
    const proteinPercent = 15;
    const fatPercent = 35;
    const margePercent = 70; //Pour plus de résultat de recherche

    const calPerProteinGram = 4;
    const calPerGlucideGram = 4;
    const calPerFatGram = 9;

    //Nombre de glucides neccesaire en gramme
    const maxCarb = pourcentage(glucidePercent, kcal) / calPerGlucideGram;
    const minCarb = reducationPourcentage(maxCarb, margePercent);

    const maxProtein = pourcentage(proteinPercent, kcal) / calPerProteinGram;
    const minProtein = reducationPourcentage(maxProtein, margePercent);

    const maxFat = pourcentage(fatPercent, kcal) / calPerFatGram;
    const minFat = reducationPourcentage(maxFat, margePercent);

    return {
      maxCarb: maxCarb,
      minCarb: minCarb,
      maxProtein: maxProtein,
      minProtein: minProtein,
      maxFat: maxFat,
      minFat: minFat,
    };
  };

  /* Math functions */

  //Obtient le pourcentage d'un nombre
  const pourcentage = (num, per) => {
    return (num / 100) * per;
  };

  //Applique une réduction en pourcentage
  const reducationPourcentage = (num, per) => {
    return num * (1 - per / 100);
  };

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  /* Construct API queries */

  const addCalorieQuery = (minCalorie, maxCalorie) => {
    return "&minCalories=" + minCalorie + "&maxCalories=" + maxCalorie;
  };

  const addProteinQuery = (minProtein, maxProtein) => {
    return "&minProtein=" + minProtein + "&maxProtein=" + maxProtein;
  };

  const addFatQuery = (minFat, maxFat) => {
    return "&minFat=" + minFat + "&maxFat=" + maxFat;
  };

  const addCarbQuery = (minCarbs, maxCarbs) => {
    return "&minCarbs=" + minCarbs + "&maxCarbs=" + maxCarbs;
  };

  /* Fetch data */

  const fetchBreakfast = async () => {
    setBrLoad(true);
    const res = await fetch(constructRecipeQuery("breakfast", neededKcal));
    const json = await res.json();

    const randomInt = getRandomInt(5);

    //Si il y a un résulat sinon recipe = null
    var recipe = null;
    if (!json.status) {
      recipe = json.results[randomInt];
    }

    setBreakfast(recipe);
    setBrLoad(false);
  };

  const fetchLunch = async () => {
    setLuLoad(true);
    const res = await fetch(constructRecipeQuery("lunch", neededKcal));
    const json = await res.json();

    console.log(json);

    const randomInt = getRandomInt(10);

    var recipe = null;
    if (!json.status) {
      recipe = json.results[randomInt];
    }

    setLunch(recipe);
    setLuLoad(false);
  };

  const fetchDinner = async () => {
    setDiLoad(true);
    const res = await fetch(constructRecipeQuery("dinner", neededKcal));
    const json = await res.json();

    const randomInt = getRandomInt(10);

    var recipe = null;
    if (!json.status) {
      recipe = json.results[randomInt];
    }

    setDinner(recipe);
    setDiLoad(false);
  };

  const reloadProgressBar = () => {
    setTotalKcal(
      breakfast.nutrition.nutrients[0].amount +
        lunch.nutrition.nutrients[0].amount +
        dinner.nutrition.nutrients[0].amount
    );
    setTotalProtein(
      breakfast.nutrition.nutrients[1].amount +
        lunch.nutrition.nutrients[1].amount +
        dinner.nutrition.nutrients[1].amount
    );
    setTotalFat(
      breakfast.nutrition.nutrients[2].amount +
        lunch.nutrition.nutrients[2].amount +
        dinner.nutrition.nutrients[2].amount
    );
    setTotalCarb(
      breakfast.nutrition.nutrients[3].amount +
        lunch.nutrition.nutrients[3].amount +
        dinner.nutrition.nutrients[3].amount
    );
  };

  const showRecipes = async () => {
    fetchBreakfast();
    fetchLunch();
    fetchDinner();
  };

  return (
    <div className="mealPlan">
      <Navbar />
      <br />
      <br />
      
      {progressBarIsOpen && (
        <Container fluid className=" w-100 transparent">
          <br />
          <Row className="justify-content-center mb-1">
            <Circle number={totalKcal} totalNum={neededKcal} color="#ff4f87" />
          </Row>
          <Row className="justify-content-around">
            <Col md="2">
              <ProgressBarNutriment
                title="Protéines"
                number={totalProtein}
                totalNumber={neededNutriments.maxProtein}
                color="ff9900"
              />
            </Col>
            <Col md="2">
              <ProgressBarNutriment
                title="Glucides"
                number={totalCarb}
                totalNumber={neededNutriments.maxCarb}
                color="82b700"
              />
            </Col>
            <Col md="2">
              <ProgressBarNutriment
                title="Lipides"
                number={totalFat}
                totalNumber={neededNutriments.maxFat}
                color="00ebdd"
              />
            </Col>
          </Row>
          <br />
        </Container>
      )}

      <Row className="justify-content-center">
        <div
          className="hideBtn"
          onClick={() => setProgressBarIsOpen(!progressBarIsOpen)}
        >
          {progressBarIsOpen ? <BsArrowBarUp /> : <BsArrowBarDown />}
        </div>
      </Row>

    {neededKcal === 0 ?
      <Container>
        <Row className="mt-1 mb-5">
          <MealPlanGroupCard
            breakfast={breakfast}
            breakfastReload={fetchBreakfast}
            brLoad={brIsLoading}
            lunch={lunch}
            lunchReload={fetchLunch}
            luLoad={luIsLoading}
            dinner={dinner}
            dinnerReload={fetchDinner}
            diLoad={diIsLoading}
          ></MealPlanGroupCard>
        </Row>
        <br />
      </Container>
      : 
      <Alert variant="danger text-center">
        Vous n'avez pas encore renseignez vos informations, merci de les saisir ici : <a>Formulaire</a>
        </Alert>
    }
    </div>
  );
};

export default MealPlan;
