import React from 'react';
import MealPlanGroupCard from '../components/MealPlanGroupCard/MealPlanGroupCard';
import ProgressBarNutriment from '../components/ProgressBar/ProgressBarNutriment';
import {Row, Col, Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';

const MealPlat = () => {

  /*Needed nutriments*/ 
  const [neededKcal, setNeededKcal] = useState(1500);
  const [neededNutriments, setNeededNutriments] = useState({});

  const [brIsLoading, setBrLoad] = useState(false);
  const [luIsLoading, setLuLoad] = useState(false);
  const [diIsLoading, setDiLoad] = useState(false);

  /*Recipe nutriments*/ 
  const [totalKcal, setTotalKcal] = useState(0)
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalCarb, setTotalCarb] = useState(0);
  const [totalFat, setTotalFat] = useState(0);

  const [breakfast, setBreakfast] = useState(null);
  const [lunch, setLunch] = useState(null);
  const [dinner, setDinner] = useState(null);

  useEffect( () => {
    setNeededNutriments(neededNutrimentsPerCalorie(neededKcal));
    showRecipes();
  }, []);

  useEffect( () => {
    if(lunch && breakfast && dinner)
        reloadProgressBar()
  }, [breakfast, lunch, dinner])


  const constructRecipeQuery = (type, totalcal)=> {

    //Recupere les informations nutritionelles neccesaires par repas, pour construire notre requête API
    const nutritionalInfos = allNutritionalInfoPerRecipeType(type, totalcal);

    const {calories} = nutritionalInfos;
    const {nutriments} = nutritionalInfos;

    const myApi = "90c3676dd91647f7926fb16833153b75"
    const richardApi = "775d6e05bc704ca4a9d20a064595cc15"
    const zuanliApi = "0a75600e2ffc40a7b0f1ca1f6591bdbe"

    const baseQuery = "https://api.spoonacular.com/recipes/complexSearch?apiKey=90c3676dd91647f7926fb16833153b75"; // a changer

    if(type !== "breakfast")
      type = "main course" // car type Dinner ou Lunch n'existe pas dans l'API
    
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
      "&number=10"
    );

    return html.join("");
  }

  //Retourne un objet contenant le nombre de calories et de nutriments neccessaires par type de repas (utile pour construire notre requête API)
  const allNutritionalInfoPerRecipeType = (type, totalKcal) => {

    const cal = neededCaloriePerRecipeType(type, totalKcal);
    const nutriments = neededNutrimentsPerCalorie(cal.maxCalorie);

    const recipeInformation = {
      calories: cal,
      nutriments: nutriments
    }

    return recipeInformation;

  }

  //Calcule le nombre de calories neccessaires par type de repas (breakfast, lunch, dinner)
  const neededCaloriePerRecipeType = (type, totalKcal) => {

    //Le déjeuner doit représenter 25% du total calorique journalier
    const breakfastPercent = 25;
    const lunchPercent = 40;
    const dinnerPercent = 35;
    const margePercent = 50; 

    var maxCalorie = 0;

    switch (type) {
      case "breakfast" :
        maxCalorie = pourcentage(breakfastPercent,totalKcal)
        break;
      case "lunch" :
        maxCalorie = pourcentage(lunchPercent,totalKcal)
        break;
      case "dinner" :
        maxCalorie = pourcentage(dinnerPercent,totalKcal)
        break;
      default:
        console.log(`Le type ${type} ne fait pas partie de la liste.`);
    }

    const minCalorie = reducationPourcentage(maxCalorie, margePercent);

    return {
      maxCalorie : maxCalorie,
      minCalorie : minCalorie
    };
  }

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
    const maxCarb = pourcentage(glucidePercent, kcal)/calPerGlucideGram;
    const minCarb = reducationPourcentage(maxCarb, margePercent)

    const maxProtein = pourcentage(proteinPercent, kcal)/calPerProteinGram;
    const minProtein = reducationPourcentage(maxProtein, margePercent)

    const maxFat = pourcentage(fatPercent, kcal)/calPerFatGram;
    const minFat = reducationPourcentage(maxFat, margePercent)

    return {
      maxCarb: maxCarb,
      minCarb: minCarb,
      maxProtein: maxProtein,
      minProtein: minProtein,
      maxFat: maxFat,
      minFat: minFat,
    }
  }



  /* Math functions */

  //Obtient le pourcentage d'un nombre
  const pourcentage = (num, per) => {
    return (num/100)*per;
  }

  //Applique une réduction en pourcentage
  const reducationPourcentage = (num, per) => {
    return num * (1 - per/100);
  }

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  

  /* Construct API queries */

  const addCalorieQuery = (minCalorie, maxCalorie) => {
    return "&minCalories=" + minCalorie + "&maxCalories=" + maxCalorie;
  }

  const addProteinQuery = (minProtein, maxProtein)=> {
    return "&minProtein=" + minProtein + "&maxProtein=" + maxProtein;
  }

  const addFatQuery = (minFat, maxFat)=> {
    return "&minFat=" + minFat + "&maxFat=" + maxFat;
  }

  const addCarbQuery = (minCarbs, maxCarbs)=> {
    return "&minCarbs=" + minCarbs + "&maxCarbs=" + maxCarbs;
  }


  /* Fetch data */

  const fetchBreakfast = async () => {
    setBrLoad(true);
    const res = await fetch(constructRecipeQuery("breakfast", neededKcal));
    const json = await res.json();

    const randomInt = getRandomInt(5);  
    const recipe = json.results[randomInt];

    setBreakfast(recipe);
    setBrLoad(false);
  }

  const fetchLunch = async () => {
    setLuLoad(true);
    const res = await fetch(constructRecipeQuery("lunch", neededKcal));
    const json = await res.json();

    const randomInt = getRandomInt(10);  
    const recipe = json.results[randomInt];

    setLunch(recipe)
    
    //setLunch(objects.results[getRandomInt(10)]);
    setLuLoad(false)
  }

  const fetchDinner = async () => {
    setDiLoad(true)
    const res = await fetch(constructRecipeQuery("dinner", neededKcal));
    const json = await res.json();

    const randomInt = getRandomInt(10);  
    const recipe = json.results[randomInt];

    setDinner(recipe);
    
    //setDinner(objects.results[getRandomInt(10)]);
    setDiLoad(false)
  }

const reloadProgressBar = () => {
    setTotalKcal(breakfast.nutrition.nutrients[0].amount + lunch.nutrition.nutrients[0].amount + dinner.nutrition.nutrients[0].amount)
    setTotalProtein(breakfast.nutrition.nutrients[1].amount + lunch.nutrition.nutrients[1].amount + dinner.nutrition.nutrients[1].amount)
    setTotalFat(breakfast.nutrition.nutrients[2].amount + lunch.nutrition.nutrients[2].amount + dinner.nutrition.nutrients[2].amount)
    setTotalCarb(breakfast.nutrition.nutrients[3].amount + lunch.nutrition.nutrients[3].amount + dinner.nutrition.nutrients[3].amount)
}




    
  const showRecipes = async () => {
    fetchBreakfast();
    fetchLunch();
    fetchDinner();

    /*setBreakfast(objects.results[getRandomInt(5)]);
    setLunch(objects.results[getRandomInt(10)]);
    setDinner(objects.results[getRandomInt(10)]);*/
  }


const objects = {
  "results": [
      {
          "vegetarian": true,
          "vegan": true,
          "glutenFree": true,
          "dairyFree": true,
          "veryHealthy": true,
          "cheap": false,
          "veryPopular": false,
          "sustainable": false,
          "weightWatcherSmartPoints": 8,
          "gaps": "no",
          "lowFodmap": false,
          "aggregateLikes": 11,
          "spoonacularScore": 96,
          "healthScore": 100,
          "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
          "license": "CC BY 3.0",
          "sourceName": "Foodista",
          "pricePerServing": 126.27,
          "id": 663559,
          "title": "Tomato and lentil soup",
          "readyInMinutes": 45,
          "servings": 4,
          "sourceUrl": "https://www.foodista.com/recipe/5V4PTMT2/tomato-and-lentil-soup",
          "image": "https://spoonacular.com/recipeImages/663559-312x231.jpg",
          "imageType": "jpg",
          "summary": "Tomato and lentil soup takes about <b>about 45 minutes</b> from beginning to end. Watching your figure? This gluten free, dairy free, lacto ovo vegetarian, and vegan recipe has <b>358 calories</b>, <b>19g of protein</b>, and <b>8g of fat</b> per serving. This recipe serves 4 and costs $1.26 per serving. 11 person were impressed by this recipe. It works well as an affordable main course for <b>Autumn</b>. A mixture of carrots, bay leaf, parsley, and a handful of other ingredients are all it takes to make this recipe so yummy. It is brought to you by Foodista. Taking all factors into account, this recipe <b>earns a spoonacular score of 97%</b>, which is super. If you like this recipe, you might also like recipes such as <a href=\"https://spoonacular.com/recipes/lentil-tomato-soup-108370\">Lentil & Tomato Soup</a>, <a href=\"https://spoonacular.com/recipes/lentil-tomato-soup-398380\">Lentil-Tomato Soup</a>, and <a href=\"https://spoonacular.com/recipes/tomato-and-lentil-soup-482854\">Tomato and Lentil Soup</a>.",
          "cuisines": [],
          "dishTypes": [
              "lunch",
              "soup",
              "main course",
              "main dish",
              "dinner"
          ],
          "diets": [
              "gluten free",
              "dairy free",
              "lacto ovo vegetarian",
              "vegan"
          ],
          "occasions": [
              "fall",
              "winter"
          ],
          "analyzedInstructions": [
              {
                  "name": "",
                  "steps": [
                      {
                          "number": 1,
                          "step": "Saut onion and garlic in olive oil for 5 minutes.",
                          "ingredients": [
                              {
                                  "id": 4053,
                                  "name": "olive oil",
                                  "localizedName": "olive oil",
                                  "image": "olive-oil.jpg"
                              },
                              {
                                  "id": 11215,
                                  "name": "garlic",
                                  "localizedName": "garlic",
                                  "image": "garlic.png"
                              },
                              {
                                  "id": 11282,
                                  "name": "onion",
                                  "localizedName": "onion",
                                  "image": "brown-onion.png"
                              }
                          ],
                          "equipment": [],
                          "length": {
                              "number": 5,
                              "unit": "minutes"
                          }
                      },
                      {
                          "number": 2,
                          "step": "Add the carrot, saut for another 2 minutes.",
                          "ingredients": [
                              {
                                  "id": 11124,
                                  "name": "carrot",
                                  "localizedName": "carrot",
                                  "image": "sliced-carrot.png"
                              }
                          ],
                          "equipment": [],
                          "length": {
                              "number": 2,
                              "unit": "minutes"
                          }
                      },
                      {
                          "number": 3,
                          "step": "Add tomatoes, bay leaf and water, stir and bring to the boil.",
                          "ingredients": [
                              {
                                  "id": 2004,
                                  "name": "bay leaves",
                                  "localizedName": "bay leaves",
                                  "image": "bay-leaves.jpg"
                              },
                              {
                                  "id": 11529,
                                  "name": "tomato",
                                  "localizedName": "tomato",
                                  "image": "tomato.png"
                              },
                              {
                                  "id": 14412,
                                  "name": "water",
                                  "localizedName": "water",
                                  "image": "water.png"
                              }
                          ],
                          "equipment": []
                      },
                      {
                          "number": 4,
                          "step": "Stir in lentils, season with salt and cook for 5 minutes.",
                          "ingredients": [
                              {
                                  "id": 10316069,
                                  "name": "lentils",
                                  "localizedName": "lentils",
                                  "image": "lentils-brown.jpg"
                              },
                              {
                                  "id": 2047,
                                  "name": "salt",
                                  "localizedName": "salt",
                                  "image": "salt.jpg"
                              }
                          ],
                          "equipment": [],
                          "length": {
                              "number": 5,
                              "unit": "minutes"
                          }
                      },
                      {
                          "number": 5,
                          "step": "Before serving sprinkle with chopped parsley.",
                          "ingredients": [
                              {
                                  "id": 11297,
                                  "name": "parsley",
                                  "localizedName": "parsley",
                                  "image": "parsley.jpg"
                              }
                          ],
                          "equipment": []
                      }
                  ]
              }
          ],
          "spoonacularSourceUrl": "https://spoonacular.com/tomato-and-lentil-soup-663559",
          "nutrition": {
              "nutrients": [
                  {
                      "title": "Calories",
                      "name": "Calories",
                      "amount": 358.106,
                      "unit": "kcal"
                  },
                  {
                      "title": "Protein",
                      "name": "Protein",
                      "amount": 19.3415,
                      "unit": "g"
                  },
                  {
                      "title": "Fat",
                      "name": "Fat",
                      "amount": 8.25797,
                      "unit": "g"
                  },
                  {
                      "title": "Carbohydrates",
                      "name": "Carbohydrates",
                      "amount": 54.666,
                      "unit": "g"
                  }
              ]
          }
      },
      {
          "vegetarian": true,
          "vegan": false,
          "glutenFree": true,
          "dairyFree": false,
          "veryHealthy": true,
          "cheap": false,
          "veryPopular": false,
          "sustainable": false,
          "weightWatcherSmartPoints": 12,
          "gaps": "no",
          "lowFodmap": false,
          "aggregateLikes": 1,
          "spoonacularScore": 92,
          "healthScore": 99,
          "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
          "license": "CC BY 3.0",
          "sourceName": "Foodista",
          "pricePerServing": 243.13,
          "id": 653682,
          "title": "One Pot Veggie Quinoa",
          "readyInMinutes": 45,
          "servings": 4,
          "sourceUrl": "http://www.foodista.com/recipe/RD2F8BLT/one-pot-veggie-quinoa",
          "image": "https://spoonacular.com/recipeImages/653682-312x231.jpg",
          "imageType": "jpg",
          "summary": "One Pot Veggie Quinoa might be just the main course you are searching for. For <b>$2.43 per serving</b>, this recipe <b>covers 30%</b> of your daily requirements of vitamins and minerals. Watching your figure? This gluten free and vegetarian recipe has <b>440 calories</b>, <b>18g of protein</b>, and <b>19g of fat</b> per serving. Head to the store and pick up broccoli florets, pepper, olive oil, and a few other things to make it today. To use up the salt you could follow this main course with the <a href=\"https://spoonacular.com/recipes/apple-turnovers-recipe-48175\">Apple Turnovers Recipe</a> as a dessert. 1 person has tried and liked this recipe. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 93%</b>. This score is spectacular. Try <a href=\"https://spoonacular.com/recipes/instant-pot-make-ahead-detox-quinoa-breakfast-bowls-920674\">Instant Pot Make-Ahead Detox Quinoa Breakfast Bowls</a>, <a href=\"https://spoonacular.com/recipes/instant-pot-chipotle-chicken-bowls-with-cilantro-lime-quinoa-918042\">Instant Pot Chipotle Chicken Bowls with Cilantro Lime Quinoa</a>, and <a href=\"https://spoonacular.com/recipes/instant-pot-one-pot-spaghetti-with-meat-sauce-926527\">Instant Pot One-Pot Spaghetti with Meat Sauce</a> for similar recipes.",
          "cuisines": [],
          "dishTypes": [
              "lunch",
              "main course",
              "main dish",
              "dinner"
          ],
          "diets": [
              "gluten free",
              "lacto ovo vegetarian"
          ],
          "occasions": [],
          "analyzedInstructions": [
              {
                  "name": "",
                  "steps": [
                      {
                          "number": 1,
                          "step": "Heat oil in a wok/skillet/nonstick saucepan.",
                          "ingredients": [
                              {
                                  "id": 4582,
                                  "name": "cooking oil",
                                  "localizedName": "cooking oil",
                                  "image": "vegetable-oil.jpg"
                              }
                          ],
                          "equipment": [
                              {
                                  "id": 404669,
                                  "name": "sauce pan",
                                  "localizedName": "sauce pan",
                                  "image": "sauce-pan.jpg"
                              },
                              {
                                  "id": 404645,
                                  "name": "frying pan",
                                  "localizedName": "frying pan",
                                  "image": "pan.png"
                              },
                              {
                                  "id": 404666,
                                  "name": "wok",
                                  "localizedName": "wok",
                                  "image": "wok.png"
                              }
                          ]
                      },
                      {
                          "number": 2,
                          "step": "Add all the herbs including garlic in the warm oil.",
                          "ingredients": [
                              {
                                  "id": 11215,
                                  "name": "garlic",
                                  "localizedName": "garlic",
                                  "image": "garlic.png"
                              },
                              {
                                  "id": 1002044,
                                  "name": "herbs",
                                  "localizedName": "herbs",
                                  "image": "mixed-fresh-herbs.jpg"
                              },
                              {
                                  "id": 4582,
                                  "name": "cooking oil",
                                  "localizedName": "cooking oil",
                                  "image": "vegetable-oil.jpg"
                              }
                          ],
                          "equipment": []
                      },
                      {
                          "number": 3,
                          "step": "Immediately add onions to it and saut until golden brown.",
                          "ingredients": [
                              {
                                  "id": 11282,
                                  "name": "onion",
                                  "localizedName": "onion",
                                  "image": "brown-onion.png"
                              }
                          ],
                          "equipment": []
                      },
                      {
                          "number": 4,
                          "step": "Add green pepper, broccoli, cauliflower and cover and cook for few minutes. The veggies should be slightly soft but crunchy.",
                          "ingredients": [
                              {
                                  "id": 11333,
                                  "name": "green pepper",
                                  "localizedName": "green pepper",
                                  "image": "green-pepper.jpg"
                              },
                              {
                                  "id": 11135,
                                  "name": "cauliflower",
                                  "localizedName": "cauliflower",
                                  "image": "cauliflower.jpg"
                              },
                              {
                                  "id": 11090,
                                  "name": "broccoli",
                                  "localizedName": "broccoli",
                                  "image": "broccoli.jpg"
                              }
                          ],
                          "equipment": []
                      },
                      {
                          "number": 5,
                          "step": "Add crinkled carrots and saut for 1 minute.",
                          "ingredients": [
                              {
                                  "id": 11124,
                                  "name": "carrot",
                                  "localizedName": "carrot",
                                  "image": "sliced-carrot.png"
                              }
                          ],
                          "equipment": [],
                          "length": {
                              "number": 1,
                              "unit": "minutes"
                          }
                      },
                      {
                          "number": 6,
                          "step": "Add tomatoes and again cover and cook for few minutes, until the tomatoes release its juice.",
                          "ingredients": [
                              {
                                  "id": 11529,
                                  "name": "tomato",
                                  "localizedName": "tomato",
                                  "image": "tomato.png"
                              },
                              {
                                  "id": 1019016,
                                  "name": "juice",
                                  "localizedName": "juice",
                                  "image": "apple-juice.jpg"
                              }
                          ],
                          "equipment": []
                      },
                      {
                          "number": 7,
                          "step": "Add burrata cheese to get the creamy texture. Cover and cook again for 2 minutes.",
                          "ingredients": [
                              {
                                  "id": 93617,
                                  "name": "burrata",
                                  "localizedName": "burrata",
                                  "image": "burrata.png"
                              }
                          ],
                          "equipment": [],
                          "length": {
                              "number": 2,
                              "unit": "minutes"
                          }
                      },
                      {
                          "number": 8,
                          "step": "Add salt, ketchup and quinoa. Saut until quinoa is well coated.",
                          "ingredients": [
                              {
                                  "id": 11935,
                                  "name": "ketchup",
                                  "localizedName": "ketchup",
                                  "image": "ketchup.png"
                              },
                              {
                                  "id": 20035,
                                  "name": "quinoa",
                                  "localizedName": "quinoa",
                                  "image": "uncooked-quinoa.png"
                              },
                              {
                                  "id": 2047,
                                  "name": "salt",
                                  "localizedName": "salt",
                                  "image": "salt.jpg"
                              }
                          ],
                          "equipment": []
                      },
                      {
                          "number": 9,
                          "step": "Add water, cover and cook until water is absorbed and quinoa is well cooked. This may take about 10-15 minutes.",
                          "ingredients": [
                              {
                                  "id": 20035,
                                  "name": "quinoa",
                                  "localizedName": "quinoa",
                                  "image": "uncooked-quinoa.png"
                              },
                              {
                                  "id": 14412,
                                  "name": "water",
                                  "localizedName": "water",
                                  "image": "water.png"
                              }
                          ],
                          "equipment": [],
                          "length": {
                              "number": 15,
                              "unit": "minutes"
                          }
                      },
                      {
                          "number": 10,
                          "step": "Garnish with more crushed pepper if required and serve hot.",
                          "ingredients": [
                              {
                                  "id": 1002030,
                                  "name": "pepper",
                                  "localizedName": "pepper",
                                  "image": "pepper.jpg"
                              }
                          ],
                          "equipment": []
                      }
                  ]
              }
          ],
          "spoonacularSourceUrl": "https://spoonacular.com/one-pot-veggie-quinoa-653682",
          "nutrition": {
              "nutrients": [
                  {
                      "title": "Calories",
                      "name": "Calories",
                      "amount": 439.816,
                      "unit": "kcal"
                  },
                  {
                      "title": "Protein",
                      "name": "Protein",
                      "amount": 17.7068,
                      "unit": "g"
                  },
                  {
                      "title": "Fat",
                      "name": "Fat",
                      "amount": 18.8069,
                      "unit": "g"
                  },
                  {
                      "title": "Carbohydrates",
                      "name": "Carbohydrates",
                      "amount": 55.8734,
                      "unit": "g"
                  }
              ]
          }
      },
      {
          "vegetarian": true,
          "vegan": true,
          "glutenFree": true,
          "dairyFree": true,
          "veryHealthy": true,
          "cheap": false,
          "veryPopular": false,
          "sustainable": false,
          "weightWatcherSmartPoints": 12,
          "gaps": "no",
          "lowFodmap": false,
          "aggregateLikes": 9,
          "spoonacularScore": 92,
          "healthScore": 93,
          "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
          "license": "CC BY 3.0",
          "sourceName": "Foodista",
          "pricePerServing": 230.43,
          "id": 1098387,
          "title": "Quinoa Salad with Barberries & Nuts",
          "readyInMinutes": 30,
          "servings": 4,
          "sourceUrl": "https://www.foodista.com/recipe/PBQJCDDG/quinoa-salad-with-barberries-nuts",
          "image": "https://spoonacular.com/recipeImages/1098387-312x231.jpg",
          "imageType": "jpg",
          "summary": "Quinoa Salad with Barberries & Nuts requires roughly <b>30 minutes</b> from start to finish. This recipe serves 4 and costs $2.3 per serving. One portion of this dish contains approximately <b>16g of protein</b>, <b>19g of fat</b>, and a total of <b>477 calories</b>. 1 person were glad they tried this recipe. Head to the store and pick up dried barberries, water, mint, and a few other things to make it today. It works well as a reasonably priced main course. It is a good option if you're following a <b>gluten free, dairy free, lacto ovo vegetarian, and vegan</b> diet. It is brought to you by Foodista. Taking all factors into account, this recipe <b>earns a spoonacular score of 93%</b>, which is outstanding. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/quinoa-salad-with-dried-fruit-and-nuts-484499\">Quinoa Salad with Dried Fruit and Nuts</a>, <a href=\"https://spoonacular.com/recipes/quinoa-salad-with-summer-veggies-and-pine-nuts-677767\">Quinoa Salad with Summer Veggies and Pine Nuts</a>, and <a href=\"https://spoonacular.com/recipes/cold-quinoa-salad-with-chicken-pine-nuts-feta-18956\">Cold Quinoa Salad With Chicken, Pine Nuts & Feta</a>.",
          "cuisines": [],
          "dishTypes": [
              "side dish",
              "lunch",
              "main course",
              "salad",
              "main dish",
              "dinner"
          ],
          "diets": [
              "gluten free",
              "dairy free",
              "lacto ovo vegetarian",
              "vegan"
          ],
          "occasions": [],
          "analyzedInstructions": [
              {
                  "name": "",
                  "steps": [
                      {
                          "number": 1,
                          "step": "Put the quinoa in a sieve and rinse under running water.",
                          "ingredients": [
                              {
                                  "id": 20035,
                                  "name": "quinoa",
                                  "localizedName": "quinoa",
                                  "image": "uncooked-quinoa.png"
                              },
                              {
                                  "id": 14412,
                                  "name": "water",
                                  "localizedName": "water",
                                  "image": "water.png"
                              }
                          ],
                          "equipment": [
                              {
                                  "id": 405600,
                                  "name": "sieve",
                                  "localizedName": "sieve",
                                  "image": "strainer.png"
                              }
                          ]
                      },
                      {
                          "number": 2,
                          "step": "Drain.",
                          "ingredients": [],
                          "equipment": []
                      },
                      {
                          "number": 3,
                          "step": "Pour the boiling water over quinoa in a medium saucepan.",
                          "ingredients": [
                              {
                                  "id": 20035,
                                  "name": "quinoa",
                                  "localizedName": "quinoa",
                                  "image": "uncooked-quinoa.png"
                              },
                              {
                                  "id": 14412,
                                  "name": "water",
                                  "localizedName": "water",
                                  "image": "water.png"
                              }
                          ],
                          "equipment": [
                              {
                                  "id": 404669,
                                  "name": "sauce pan",
                                  "localizedName": "sauce pan",
                                  "image": "sauce-pan.jpg"
                              }
                          ]
                      },
                      {
                          "number": 4,
                          "step": "Add salt, stir well and cook over medium-low heat until quinoa is cooked through but still has a bite in the center.",
                          "ingredients": [
                              {
                                  "id": 20035,
                                  "name": "quinoa",
                                  "localizedName": "quinoa",
                                  "image": "uncooked-quinoa.png"
                              },
                              {
                                  "id": 2047,
                                  "name": "salt",
                                  "localizedName": "salt",
                                  "image": "salt.jpg"
                              }
                          ],
                          "equipment": []
                      },
                      {
                          "number": 5,
                          "step": "Drain in a sieve.Pick over the barberries, rinse in a sieve and dry on kitchen paper.While the quinoa is cooking, heat 1 tablespoon of oil in a saucepan over medium heat and lightly toast the almond slivers.",
                          "ingredients": [
                              {
                                  "id": 10012061,
                                  "name": "slivered almonds",
                                  "localizedName": "slivered almonds",
                                  "image": "almonds-slivered.png"
                              },
                              {
                                  "id": 20035,
                                  "name": "quinoa",
                                  "localizedName": "quinoa",
                                  "image": "uncooked-quinoa.png"
                              },
                              {
                                  "id": 18070,
                                  "name": "toast",
                                  "localizedName": "toast",
                                  "image": "toast"
                              },
                              {
                                  "id": 4582,
                                  "name": "cooking oil",
                                  "localizedName": "cooking oil",
                                  "image": "vegetable-oil.jpg"
                              }
                          ],
                          "equipment": [
                              {
                                  "id": 404669,
                                  "name": "sauce pan",
                                  "localizedName": "sauce pan",
                                  "image": "sauce-pan.jpg"
                              },
                              {
                                  "id": 405600,
                                  "name": "sieve",
                                  "localizedName": "sieve",
                                  "image": "strainer.png"
                              }
                          ]
                      },
                      {
                          "number": 6,
                          "step": "Add the slivered pistachios, then the rest of the oil and the rinsed barberries. Cook briefly until the barberries are shiny and a little puffed.Save a tablespoon of the barberry and nut mix and a tablespoon of the chopped herbs for garnishing the finished dish.",
                          "ingredients": [
                              {
                                  "id": 12151,
                                  "name": "pistachio nuts",
                                  "localizedName": "pistachio nuts",
                                  "image": "pistachios.jpg"
                              },
                              {
                                  "id": 0,
                                  "name": "mixed nuts",
                                  "localizedName": "mixed nuts",
                                  "image": "nuts-mixed.jpg"
                              },
                              {
                                  "id": 1002044,
                                  "name": "herbs",
                                  "localizedName": "herbs",
                                  "image": "mixed-fresh-herbs.jpg"
                              },
                              {
                                  "id": 4582,
                                  "name": "cooking oil",
                                  "localizedName": "cooking oil",
                                  "image": "vegetable-oil.jpg"
                              }
                          ],
                          "equipment": []
                      },
                      {
                          "number": 7,
                          "step": "Mix all of the remaining nut and barberry mix, herbs and quinoa. Return to the pot and place on low heat. Cover with a lid and cook for ten minutes or until completely heated through and steam is rising. Turn into a serving dish and fluff with a fork.",
                          "ingredients": [
                              {
                                  "id": 20035,
                                  "name": "quinoa",
                                  "localizedName": "quinoa",
                                  "image": "uncooked-quinoa.png"
                              },
                              {
                                  "id": 1002044,
                                  "name": "herbs",
                                  "localizedName": "herbs",
                                  "image": "mixed-fresh-herbs.jpg"
                              }
                          ],
                          "equipment": [
                              {
                                  "id": 404752,
                                  "name": "pot",
                                  "localizedName": "pot",
                                  "image": "stock-pot.jpg"
                              }
                          ],
                          "length": {
                              "number": 10,
                              "unit": "minutes"
                          }
                      },
                      {
                          "number": 8,
                          "step": "Add a little extra olive oil and a twist of black pepper if you wish.",
                          "ingredients": [
                              {
                                  "id": 1002030,
                                  "name": "black pepper",
                                  "localizedName": "black pepper",
                                  "image": "pepper.jpg"
                              },
                              {
                                  "id": 4053,
                                  "name": "olive oil",
                                  "localizedName": "olive oil",
                                  "image": "olive-oil.jpg"
                              }
                          ],
                          "equipment": []
                      },
                      {
                          "number": 9,
                          "step": "Sprinkle the quinoa with the rest of the berry-nut mix and chopped herbs and serve on its own as a main dish or as a side dish.",
                          "ingredients": [
                              {
                                  "id": 0,
                                  "name": "mixed nuts",
                                  "localizedName": "mixed nuts",
                                  "image": "nuts-mixed.jpg"
                              },
                              {
                                  "id": 20035,
                                  "name": "quinoa",
                                  "localizedName": "quinoa",
                                  "image": "uncooked-quinoa.png"
                              },
                              {
                                  "id": 1009054,
                                  "name": "berries",
                                  "localizedName": "berries",
                                  "image": "berries-mixed.jpg"
                              },
                              {
                                  "id": 1002044,
                                  "name": "herbs",
                                  "localizedName": "herbs",
                                  "image": "mixed-fresh-herbs.jpg"
                              }
                          ],
                          "equipment": []
                      }
                  ]
              }
          ],
          "spoonacularSourceUrl": "https://spoonacular.com/quinoa-salad-with-barberries-nuts-1098387",
          "nutrition": {
              "nutrients": [
                  {
                      "title": "Calories",
                      "name": "Calories",
                      "amount": 477.405,
                      "unit": "kcal"
                  },
                  {
                      "title": "Protein",
                      "name": "Protein",
                      "amount": 15.595,
                      "unit": "g"
                  },
                  {
                      "title": "Fat",
                      "name": "Fat",
                      "amount": 18.9997,
                      "unit": "g"
                  },
                  {
                      "title": "Carbohydrates",
                      "name": "Carbohydrates",
                      "amount": 63.3378,
                      "unit": "g"
                  }
              ]
          }
      },
      {
          "vegetarian": true,
          "vegan": false,
          "glutenFree": true,
          "dairyFree": false,
          "veryHealthy": true,
          "cheap": false,
          "veryPopular": false,
          "sustainable": false,
          "weightWatcherSmartPoints": 8,
          "gaps": "no",
          "lowFodmap": false,
          "aggregateLikes": 2,
          "spoonacularScore": 91,
          "healthScore": 98,
          "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
          "license": "CC BY 3.0",
          "sourceName": "Foodista",
          "pricePerServing": 213.91,
          "id": 658087,
          "title": "Red Quinoa and Roasted Cauliflower Salad",
          "readyInMinutes": 45,
          "servings": 4,
          "sourceUrl": "https://www.foodista.com/recipe/22QVP2CY/red-quinoa-and-cauliflower-salad",
          "image": "https://spoonacular.com/recipeImages/658087-312x231.jpg",
          "imageType": "jpg",
          "summary": "Need a <b>gluten free and lacto ovo vegetarian main course</b>? Red Quinoan and Roasted Cauliflower Salad could be a super recipe to try. This recipe makes 4 servings with <b>351 calories</b>, <b>13g of protein</b>, and <b>16g of fat</b> each. For <b>$2.14 per serving</b>, this recipe <b>covers 27%</b> of your daily requirements of vitamins and minerals. This recipe is liked by 2 foodies and cooks. From preparation to the plate, this recipe takes approximately <b>approximately 45 minutes</b>. If you have cauliflower, olive oil, walnuts, and a few other ingredients on hand, you can make it. It is brought to you by Foodista. All things considered, we decided this recipe <b>deserves a spoonacular score of 92%</b>. This score is excellent. Similar recipes are <a href=\"https://spoonacular.com/recipes/roasted-cauliflower-and-quinoa-salad-1065461\">Roasted Cauliflower and Quinoa Salad</a>, <a href=\"https://spoonacular.com/recipes/curry-roasted-cauliflower-quinoa-salad-616580\">CURRY ROASTED CAULIFLOWER & QUINOA SALAD</a>, and <a href=\"https://spoonacular.com/recipes/roasted-cauliflower-and-mushroom-quinoa-salad-in-balsamic-vinaigrette-247463\">Roasted Cauliflower and Mushroom Quinoa Salad in Balsamic Vinaigrette</a>.",
          "cuisines": [],
          "dishTypes": [
              "side dish",
              "lunch",
              "main course",
              "salad",
              "main dish",
              "dinner"
          ],
          "diets": [
              "gluten free",
              "lacto ovo vegetarian"
          ],
          "occasions": [],
          "analyzedInstructions": [
              {
                  "name": "",
                  "steps": [
                      {
                          "number": 1,
                          "step": "Cook the quinoa according to package directions.",
                          "ingredients": [
                              {
                                  "id": 20035,
                                  "name": "quinoa",
                                  "localizedName": "quinoa",
                                  "image": "uncooked-quinoa.png"
                              }
                          ],
                          "equipment": []
                      },
                      {
                          "number": 2,
                          "step": "Preheat the oven to 400 F",
                          "ingredients": [],
                          "equipment": [
                              {
                                  "id": 404784,
                                  "name": "oven",
                                  "localizedName": "oven",
                                  "image": "oven.jpg",
                                  "temperature": {
                                      "number": 400,
                                      "unit": "Fahrenheit"
                                  }
                              }
                          ]
                      },
                      {
                          "number": 3,
                          "step": "Cut head of cauliflower into florets.  Toss with olive oil, salt and pepper and place on a baking sheet.  Roast cauliflower for 20 minutes or until tender.",
                          "ingredients": [
                              {
                                  "id": 1102047,
                                  "name": "salt and pepper",
                                  "localizedName": "salt and pepper",
                                  "image": "salt-and-pepper.jpg"
                              },
                              {
                                  "id": 11135,
                                  "name": "cauliflower",
                                  "localizedName": "cauliflower",
                                  "image": "cauliflower.jpg"
                              },
                              {
                                  "id": 4053,
                                  "name": "olive oil",
                                  "localizedName": "olive oil",
                                  "image": "olive-oil.jpg"
                              }
                          ],
                          "equipment": [
                              {
                                  "id": 404727,
                                  "name": "baking sheet",
                                  "localizedName": "baking sheet",
                                  "image": "baking-sheet.jpg"
                              }
                          ],
                          "length": {
                              "number": 20,
                              "unit": "minutes"
                          }
                      },
                      {
                          "number": 4,
                          "step": "Meanwhile, crumble the cheese and chop the rest of the ingredients.",
                          "ingredients": [
                              {
                                  "id": 1041009,
                                  "name": "cheese",
                                  "localizedName": "cheese",
                                  "image": "cheddar-cheese.png"
                              }
                          ],
                          "equipment": []
                      },
                      {
                          "number": 5,
                          "step": "Mix them all together, sprinkle with some extra virgin olive oil and juice from 1/2 a lemon season to taste.",
                          "ingredients": [
                              {
                                  "id": 1034053,
                                  "name": "extra virgin olive oil",
                                  "localizedName": "extra virgin olive oil",
                                  "image": "olive-oil.jpg"
                              },
                              {
                                  "id": 1019016,
                                  "name": "juice",
                                  "localizedName": "juice",
                                  "image": "apple-juice.jpg"
                              },
                              {
                                  "id": 9150,
                                  "name": "lemon",
                                  "localizedName": "lemon",
                                  "image": "lemon.png"
                              }
                          ],
                          "equipment": []
                      },
                      {
                          "number": 6,
                          "step": "Serve warm or cold.",
                          "ingredients": [],
                          "equipment": []
                      }
                  ]
              }
          ],
          "spoonacularSourceUrl": "https://spoonacular.com/red-quinoa-and-roasted-cauliflower-salad-658087",
          "nutrition": {
              "nutrients": [
                  {
                      "title": "Calories",
                      "name": "Calories",
                      "amount": 351.36,
                      "unit": "kcal"
                  },
                  {
                      "title": "Protein",
                      "name": "Protein",
                      "amount": 12.844,
                      "unit": "g"
                  },
                  {
                      "title": "Fat",
                      "name": "Fat",
                      "amount": 15.6623,
                      "unit": "g"
                  },
                  {
                      "title": "Carbohydrates",
                      "name": "Carbohydrates",
                      "amount": 44.7073,
                      "unit": "g"
                  }
              ]
          }
      },
      {
          "vegetarian": true,
          "vegan": false,
          "glutenFree": true,
          "dairyFree": false,
          "veryHealthy": true,
          "cheap": false,
          "veryPopular": false,
          "sustainable": false,
          "weightWatcherSmartPoints": 6,
          "gaps": "no",
          "lowFodmap": false,
          "aggregateLikes": 3,
          "spoonacularScore": 91,
          "healthScore": 86,
          "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
          "license": "CC BY 3.0",
          "sourceName": "Foodista",
          "pricePerServing": 164.25,
          "id": 642468,
          "title": "Ethiopian Lentil Curry",
          "readyInMinutes": 75,
          "servings": 6,
          "sourceUrl": "http://www.foodista.com/recipe/VND4VYMV/ethiopian-lentil-curry",
          "image": "https://spoonacular.com/recipeImages/642468-312x231.jpg",
          "imageType": "jpg",
          "summary": "The recipe Ethiopian Lentil Curry could satisfy your Indian craving in approximately <b>1 hour and 15 minutes</b>. For <b>$1.01 per serving</b>, you get a main course that serves 6. Watching your figure? This gluten free and vegetarian recipe has <b>268 calories</b>, <b>15g of protein</b>, and <b>6g of fat</b> per serving. 3 people have made this recipe and would make it again. A mixture of masala molida, cauliflower head, garlic cloves, and a handful of other ingredients are all it takes to make this recipe so flavorful. All things considered, we decided this recipe <b>deserves a spoonacular score of 88%</b>. This score is awesome. Similar recipes include <a href=\"https://spoonacular.com/recipes/spicy-ethiopian-red-lentil-stew-33758\">Spicy Ethiopian Red Lentil Stew</a>, <a href=\"https://spoonacular.com/recipes/ethiopian-s-mesir-wat-red-lentil-stew-with-ayib-552200\">Ethiopian s: Mesir Wat Red Lentil Stew with Ayib</a>, and <a href=\"https://spoonacular.com/recipes/red-lentil-curry-33804\">Red Lentil Curry</a>.",
          "cuisines": [
              "Indian",
              "Asian"
          ],
          "dishTypes": [
              "lunch",
              "main course",
              "main dish",
              "dinner"
          ],
          "diets": [
              "gluten free",
              "lacto ovo vegetarian"
          ],
          "occasions": [],
          "analyzedInstructions": [
              {
                  "name": "",
                  "steps": [
                      {
                          "number": 1,
                          "step": "In a large pot heat oil over medium heat.",
                          "ingredients": [
                              {
                                  "id": 4582,
                                  "name": "cooking oil",
                                  "localizedName": "cooking oil",
                                  "image": "vegetable-oil.jpg"
                              }
                          ],
                          "equipment": [
                              {
                                  "id": 404752,
                                  "name": "pot",
                                  "localizedName": "pot",
                                  "image": "stock-pot.jpg"
                              }
                          ]
                      },
                      {
                          "number": 2,
                          "step": "Add onions and saut until translucent.",
                          "ingredients": [
                              {
                                  "id": 11282,
                                  "name": "onion",
                                  "localizedName": "onion",
                                  "image": "brown-onion.png"
                              }
                          ],
                          "equipment": []
                      },
                      {
                          "number": 3,
                          "step": "Add minced garlic and continue to saut for another minute.",
                          "ingredients": [
                              {
                                  "id": 0,
                                  "name": "minced garlic",
                                  "localizedName": "minced garlic",
                                  "image": "garlic.png"
                              }
                          ],
                          "equipment": []
                      },
                      {
                          "number": 4,
                          "step": "Combine cauliflower, peas and lentils in the pot, sprinkle with amchar massala and massala molida and saut for 5 minutes.",
                          "ingredients": [
                              {
                                  "id": 11135,
                                  "name": "cauliflower",
                                  "localizedName": "cauliflower",
                                  "image": "cauliflower.jpg"
                              },
                              {
                                  "id": 10316069,
                                  "name": "lentils",
                                  "localizedName": "lentils",
                                  "image": "lentils-brown.jpg"
                              },
                              {
                                  "id": 11304,
                                  "name": "peas",
                                  "localizedName": "peas",
                                  "image": "peas.jpg"
                              }
                          ],
                          "equipment": [
                              {
                                  "id": 404752,
                                  "name": "pot",
                                  "localizedName": "pot",
                                  "image": "stock-pot.jpg"
                              }
                          ],
                          "length": {
                              "number": 5,
                              "unit": "minutes"
                          }
                      },
                      {
                          "number": 5,
                          "step": "Pour crushed tomatoes and tomato paste into the pot and stir to combine.",
                          "ingredients": [
                              {
                                  "id": 11693,
                                  "name": "crushed tomatoes",
                                  "localizedName": "crushed tomatoes",
                                  "image": "tomatoes-canned.png"
                              },
                              {
                                  "id": 11887,
                                  "name": "tomato paste",
                                  "localizedName": "tomato paste",
                                  "image": "tomato-paste.jpg"
                              }
                          ],
                          "equipment": [
                              {
                                  "id": 404752,
                                  "name": "pot",
                                  "localizedName": "pot",
                                  "image": "stock-pot.jpg"
                              }
                          ]
                      },
                      {
                          "number": 6,
                          "step": "Add about two cups of water and bring curry to a boil.Reduce heat, cover, and simmer on low until lentils are tender; about an hour.",
                          "ingredients": [
                              {
                                  "id": 10316069,
                                  "name": "lentils",
                                  "localizedName": "lentils",
                                  "image": "lentils-brown.jpg"
                              },
                              {
                                  "id": 2015,
                                  "name": "curry powder",
                                  "localizedName": "curry powder",
                                  "image": "curry-powder.jpg"
                              },
                              {
                                  "id": 14412,
                                  "name": "water",
                                  "localizedName": "water",
                                  "image": "water.png"
                              }
                          ],
                          "equipment": []
                      },
                      {
                          "number": 7,
                          "step": "Mix in plain yogurt and serve immediately.",
                          "ingredients": [
                              {
                                  "id": 1001116,
                                  "name": "plain yogurt",
                                  "localizedName": "plain yogurt",
                                  "image": "plain-yogurt.jpg"
                              }
                          ],
                          "equipment": []
                      }
                  ]
              }
          ],
          "spoonacularSourceUrl": "https://spoonacular.com/ethiopian-lentil-curry-642468",
          "nutrition": {
              "nutrients": [
                  {
                      "title": "Calories",
                      "name": "Calories",
                      "amount": 287.119,
                      "unit": "kcal"
                  },
                  {
                      "title": "Protein",
                      "name": "Protein",
                      "amount": 16.0906,
                      "unit": "g"
                  },
                  {
                      "title": "Fat",
                      "name": "Fat",
                      "amount": 6.6036,
                      "unit": "g"
                  },
                  {
                      "title": "Carbohydrates",
                      "name": "Carbohydrates",
                      "amount": 44.6078,
                      "unit": "g"
                  }
              ]
          }
      },
      {
          "vegetarian": true,
          "vegan": true,
          "glutenFree": true,
          "dairyFree": true,
          "veryHealthy": true,
          "cheap": false,
          "veryPopular": false,
          "sustainable": false,
          "weightWatcherSmartPoints": 11,
          "gaps": "no",
          "lowFodmap": false,
          "aggregateLikes": 1,
          "spoonacularScore": 91,
          "healthScore": 87,
          "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
          "license": "CC BY 3.0",
          "sourceName": "Foodista",
          "pricePerServing": 147.18,
          "id": 652594,
          "title": "Mung Bean Sprout and Quinoa Salad",
          "readyInMinutes": 45,
          "servings": 6,
          "sourceUrl": "http://www.foodista.com/recipe/WFDCWVHF/mung-bean-sprout-and-quinoa-salad",
          "image": "https://spoonacular.com/recipeImages/652594-312x231.jpg",
          "imageType": "jpg",
          "summary": "Mung Bean Sprout and Quinoa Salad might be just the main course you are searching for. This gluten free and vegan recipe serves 6 and costs <b>$1.47 per serving</b>. One serving contains <b>358 calories</b>, <b>17g of protein</b>, and <b>11g of fat</b>. This recipe is liked by 1 foodies and cooks. A mixture of cilantro, spinach, of onions, and a handful of other ingredients are all it takes to make this recipe so yummy. To use up the onions you could follow this main course with the <a href=\"https://spoonacular.com/recipes/candy-corn-cupcakes-63881\">Candy Corn Cupcakes</a> as a dessert. From preparation to the plate, this recipe takes around <b>45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 92%</b>. This score is outstanding. Try <a href=\"https://spoonacular.com/recipes/mung-bean-sprout-salad-34410\">Mung Bean Sprout Salad</a>, <a href=\"https://spoonacular.com/recipes/korean-mung-bean-sprout-salad-565117\">Korean Mung Bean Sprout Salad</a>, and <a href=\"https://spoonacular.com/recipes/mung-beans-beets-and-quinoa-salad-551232\">Mung beans, Beets and Quinoa Salad</a> for similar recipes.",
          "cuisines": [],
          "dishTypes": [
              "lunch",
              "main course",
              "main dish",
              "dinner"
          ],
          "diets": [
              "gluten free",
              "dairy free",
              "lacto ovo vegetarian",
              "vegan"
          ],
          "occasions": [],
          "analyzedInstructions": [
              {
                  "name": "",
                  "steps": [
                      {
                          "number": 1,
                          "step": "First you sprout!Soak mung beans over night in a jar covered with cheese cloth.  Note: use rubber band to keep cheese cloth in place.Rinse and pour out all of the water from the soaked mung beans.Then place jar diagonally in a bowl, like picture below.Wash mung beans 2 times a day.  You can have them grow 1 to 2 inches in lengthbut, I just kept them short.  I just let it sit for a little bit more than 1.5 days.It is ready to eat after washing.Prepare sprouts",
                          "ingredients": [
                              {
                                  "id": 16080,
                                  "name": "mung beans",
                                  "localizedName": "mung beans",
                                  "image": "mung-beans.png"
                              },
                              {
                                  "id": 11001,
                                  "name": "sprouts",
                                  "localizedName": "sprouts",
                                  "image": "alfalfa-sprouts.png"
                              },
                              {
                                  "id": 1041009,
                                  "name": "cheese",
                                  "localizedName": "cheese",
                                  "image": "cheddar-cheese.png"
                              },
                              {
                                  "id": 14412,
                                  "name": "water",
                                  "localizedName": "water",
                                  "image": "water.png"
                              }
                          ],
                          "equipment": [
                              {
                                  "id": 404647,
                                  "name": "cheesecloth",
                                  "localizedName": "cheesecloth",
                                  "image": "cheesecloth.jpg"
                              },
                              {
                                  "id": 404783,
                                  "name": "bowl",
                                  "localizedName": "bowl",
                                  "image": "bowl.jpg"
                              }
                          ]
                      },
                      {
                          "number": 2,
                          "step": "Cook quinoa",
                          "ingredients": [
                              {
                                  "id": 20035,
                                  "name": "quinoa",
                                  "localizedName": "quinoa",
                                  "image": "uncooked-quinoa.png"
                              }
                          ],
                          "equipment": []
                      },
                      {
                          "number": 3,
                          "step": "Steam. corn",
                          "ingredients": [
                              {
                                  "id": 11168,
                                  "name": "corn",
                                  "localizedName": "corn",
                                  "image": "corn.png"
                              }
                          ],
                          "equipment": []
                      },
                      {
                          "number": 4,
                          "step": "Prepare veggies (mince, slice, and dice)",
                          "ingredients": [
                              {
                                  "id": 0,
                                  "name": "ground meat",
                                  "localizedName": "ground meat",
                                  "image": "fresh-ground-beef.jpg"
                              }
                          ],
                          "equipment": []
                      },
                      {
                          "number": 5,
                          "step": "Place quinoa and prepared veggies in a bowl and mix in dressing.  Then, place over a bed of spinach.Top off with corn (optional)Enjoy!",
                          "ingredients": [
                              {
                                  "id": 10011457,
                                  "name": "spinach",
                                  "localizedName": "spinach",
                                  "image": "spinach.jpg"
                              },
                              {
                                  "id": 20035,
                                  "name": "quinoa",
                                  "localizedName": "quinoa",
                                  "image": "uncooked-quinoa.png"
                              },
                              {
                                  "id": 11168,
                                  "name": "corn",
                                  "localizedName": "corn",
                                  "image": "corn.png"
                              }
                          ],
                          "equipment": [
                              {
                                  "id": 404783,
                                  "name": "bowl",
                                  "localizedName": "bowl",
                                  "image": "bowl.jpg"
                              }
                          ]
                      }
                  ]
              }
          ],
          "spoonacularSourceUrl": "https://spoonacular.com/mung-bean-sprout-and-quinoa-salad-652594",
          "nutrition": {
              "nutrients": [
                  {
                      "title": "Calories",
                      "name": "Calories",
                      "amount": 358.341,
                      "unit": "kcal"
                  },
                  {
                      "title": "Protein",
                      "name": "Protein",
                      "amount": 16.5593,
                      "unit": "g"
                  },
                  {
                      "title": "Fat",
                      "name": "Fat",
                      "amount": 11.3701,
                      "unit": "g"
                  },
                  {
                      "title": "Carbohydrates",
                      "name": "Carbohydrates",
                      "amount": 49.9846,
                      "unit": "g"
                  }
              ]
          }
      },
      {
          "vegetarian": true,
          "vegan": false,
          "glutenFree": true,
          "dairyFree": false,
          "veryHealthy": false,
          "cheap": false,
          "veryPopular": false,
          "sustainable": false,
          "weightWatcherSmartPoints": 6,
          "gaps": "no",
          "lowFodmap": false,
          "aggregateLikes": 57,
          "spoonacularScore": 90,
          "healthScore": 31,
          "creditsText": "Jen West",
          "sourceName": "Pink When",
          "pricePerServing": 315.97,
          "id": 715393,
          "title": "Berry-licious Smoothie Bowl",
          "readyInMinutes": 45,
          "servings": 1,
          "sourceUrl": "http://www.pinkwhen.com/berry-licious-smoothie-bowl-recipe/",
          "image": "https://spoonacular.com/recipeImages/715393-312x231.jpg",
          "imageType": "jpg",
          "summary": "You can never have too many main course recipes, so give Berry-licious Smoothie Bowl a try. This recipe serves 1 and costs $3.16 per serving. One serving contains <b>304 calories</b>, <b>19g of protein</b>, and <b>12g of fat</b>. 56 people have made this recipe and would make it again. Head to the store and pick up raspberries, kiwi, greek yogurt, and a few other things to make it today. To use up the raspberries you could follow this main course with the <a href=\"https://spoonacular.com/recipes/vanilla-cupcakes-with-lemon-cream-and-raspberries-63761\">Vanilla Cupcakes with Lemon Cream and Raspberries</a> as a dessert. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 90%</b>. This score is amazing. Try <a href=\"https://spoonacular.com/recipes/acai-berry-smoothie-bowl-732444\">Acai Berry Smoothie Bowl</a>, <a href=\"https://spoonacular.com/recipes/berry-pitaya-smoothie-bowl-774829\">Berry Pitaya Smoothie Bowl</a>, and <a href=\"https://spoonacular.com/recipes/berry-banana-smoothie-bowl-720519\">Berry Banana Smoothie Bowl</a> for similar recipes.",
          "cuisines": [],
          "dishTypes": [
              "lunch",
              "main course",
              "main dish",
              "dinner"
          ],
          "diets": [
              "gluten free",
              "lacto ovo vegetarian",
              "primal"
          ],
          "occasions": [],
          "analyzedInstructions": [],
          "spoonacularSourceUrl": "https://spoonacular.com/berry-licious-smoothie-bowl-715393",
          "nutrition": {
              "nutrients": [
                  {
                      "title": "Calories",
                      "name": "Calories",
                      "amount": 303.599,
                      "unit": "kcal"
                  },
                  {
                      "title": "Protein",
                      "name": "Protein",
                      "amount": 18.8702,
                      "unit": "g"
                  },
                  {
                      "title": "Fat",
                      "name": "Fat",
                      "amount": 12.2174,
                      "unit": "g"
                  },
                  {
                      "title": "Carbohydrates",
                      "name": "Carbohydrates",
                      "amount": 33.656,
                      "unit": "g"
                  }
              ]
          }
      },
      {
          "vegetarian": true,
          "vegan": true,
          "glutenFree": true,
          "dairyFree": true,
          "veryHealthy": true,
          "cheap": false,
          "veryPopular": false,
          "sustainable": false,
          "weightWatcherSmartPoints": 9,
          "gaps": "no",
          "lowFodmap": false,
          "aggregateLikes": 0,
          "spoonacularScore": 88,
          "healthScore": 74,
          "creditsText": "TheHungryHood",
          "license": "spoonacular's terms",
          "sourceName": "spoonacular",
          "pricePerServing": 44.27,
          "id": 157993,
          "title": "Spicy Roasted Chickpeas",
          "author": "TheHungryHood",
          "readyInMinutes": 45,
          "servings": 5,
          "sourceUrl": "http://spoonacular.com/-1390627460234",
          "image": "https://spoonacular.com/recipeImages/157993-312x231.jpg",
          "imageType": "jpg",
          "summary": "Spicy Roasted Chickpeas might be just the hor d'oeuvre you are searching for. This recipe makes 5 servings with <b>330 calories</b>, <b>15g of protein</b>, and <b>10g of fat</b> each. For <b>44 cents per serving</b>, this recipe <b>covers 19%</b> of your daily requirements of vitamins and minerals. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. A mixture of cayenne pepper, cumin, coriander, and a handful of other ingredients are all it takes to make this recipe so tasty. It is a good option if you're following a <b>gluten free and vegan</b> diet. Try <a href=\"https://spoonacular.com/recipes/spicy-roasted-chickpeas-31369\">Spicy Roasted Chickpeas</a>, <a href=\"https://spoonacular.com/recipes/spicy-roasted-chickpeas-31370\">Spicy Roasted Chickpeas</a>, and <a href=\"https://spoonacular.com/recipes/spicy-roasted-chickpeas-31413\">Spicy Roasted Chickpeas</a> for similar recipes.",
          "cuisines": [],
          "dishTypes": [
              "lunch",
              "main course",
              "main dish",
              "dinner"
          ],
          "diets": [
              "gluten free",
              "dairy free",
              "lacto ovo vegetarian",
              "vegan"
          ],
          "occasions": [],
          "analyzedInstructions": [
              {
                  "name": "",
                  "steps": [
                      {
                          "number": 1,
                          "step": "Preheat your oven to 400 degrees F.Rinse and dry the chickpeas.Toss the chickpeas in the olive oil and spices.",
                          "ingredients": [
                              {
                                  "id": 16057,
                                  "name": "chickpeas",
                                  "localizedName": "chickpeas",
                                  "image": "chickpeas.png"
                              },
                              {
                                  "id": 4053,
                                  "name": "olive oil",
                                  "localizedName": "olive oil",
                                  "image": "olive-oil.jpg"
                              },
                              {
                                  "id": 2035,
                                  "name": "spices",
                                  "localizedName": "spices",
                                  "image": "spices.png"
                              }
                          ],
                          "equipment": [
                              {
                                  "id": 404784,
                                  "name": "oven",
                                  "localizedName": "oven",
                                  "image": "oven.jpg",
                                  "temperature": {
                                      "number": 400,
                                      "unit": "Fahrenheit"
                                  }
                              }
                          ]
                      },
                      {
                          "number": 2,
                          "step": "Bake the chickpeas on a cookie sheet for about 40 minutes. Then eat up!",
                          "ingredients": [
                              {
                                  "id": 16057,
                                  "name": "chickpeas",
                                  "localizedName": "chickpeas",
                                  "image": "chickpeas.png"
                              },
                              {
                                  "id": 10118192,
                                  "name": "cookies",
                                  "localizedName": "cookies",
                                  "image": "shortbread-cookies.jpg"
                              }
                          ],
                          "equipment": [
                              {
                                  "id": 404727,
                                  "name": "baking sheet",
                                  "localizedName": "baking sheet",
                                  "image": "baking-sheet.jpg"
                              },
                              {
                                  "id": 404784,
                                  "name": "oven",
                                  "localizedName": "oven",
                                  "image": "oven.jpg"
                              }
                          ],
                          "length": {
                              "number": 40,
                              "unit": "minutes"
                          }
                      }
                  ]
              }
          ],
          "spoonacularSourceUrl": "https://spoonacular.com/spicy-roasted-chickpeas-157993",
          "nutrition": {
              "nutrients": [
                  {
                      "title": "Calories",
                      "name": "Calories",
                      "amount": 329.815,
                      "unit": "kcal"
                  },
                  {
                      "title": "Protein",
                      "name": "Protein",
                      "amount": 15.135,
                      "unit": "g"
                  },
                  {
                      "title": "Fat",
                      "name": "Fat",
                      "amount": 10.0737,
                      "unit": "g"
                  },
                  {
                      "title": "Carbohydrates",
                      "name": "Carbohydrates",
                      "amount": 46.8679,
                      "unit": "g"
                  }
              ]
          }
      },
      {
          "vegetarian": false,
          "vegan": false,
          "glutenFree": false,
          "dairyFree": false,
          "veryHealthy": false,
          "cheap": false,
          "veryPopular": false,
          "sustainable": false,
          "weightWatcherSmartPoints": 9,
          "gaps": "no",
          "lowFodmap": false,
          "aggregateLikes": 19,
          "spoonacularScore": 88,
          "healthScore": 35,
          "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
          "license": "CC BY 3.0",
          "sourceName": "Foodista",
          "pricePerServing": 313.78,
          "id": 663588,
          "title": "Tomato Cutlets",
          "readyInMinutes": 45,
          "servings": 5,
          "sourceUrl": "http://www.foodista.com/recipe/DF3VCPLF/tomato-cutlets",
          "image": "https://spoonacular.com/recipeImages/663588-312x231.jpg",
          "imageType": "jpg",
          "summary": "Tomato Cutlets might be just the main course you are searching for. One serving contains <b>384 calories</b>, <b>19g of protein</b>, and <b>17g of fat</b>. For <b>$3.14 per serving</b>, this recipe <b>covers 30%</b> of your daily requirements of vitamins and minerals. 19 people were impressed by this recipe. Head to the store and pick up baby eggplant, eggs, bread crumbs, and a few other things to make it today. To use up the eggs you could follow this main course with the <a href=\"https://spoonacular.com/recipes/rose-levy-beranbaums-chocolate-tomato-cake-with-mystery-ganache-27408\">Rose Levy Beranbaum's Chocolate Tomato Cake with Mystery Ganache</a> as a dessert. All things considered, we decided this recipe <b>deserves a spoonacular score of 88%</b>. This score is outstanding. Try <a href=\"https://spoonacular.com/recipes/chicken-cutlets-with-tomato-saut-27288\">Chicken Cutlets with Tomato Sauté</a>, <a href=\"https://spoonacular.com/recipes/turkey-cutlets-with-tomato-sauce-411770\">Turkey Cutlets with Tomato Sauce</a>, and <a href=\"https://spoonacular.com/recipes/pork-cutlets-parmesan-with-tomato-sauce-146196\">Pork Cutlets Parmesan with Tomato Sauce</a> for similar recipes.",
          "cuisines": [],
          "dishTypes": [
              "lunch",
              "main course",
              "main dish",
              "dinner"
          ],
          "diets": [],
          "occasions": [],
          "analyzedInstructions": [
              {
                  "name": "",
                  "steps": [
                      {
                          "number": 1,
                          "step": "Prepare the eggs, bread crumbs and sliced tomatoes.Dip the tomato slice in the egg wash and then in the bread crumbs.  If you have extra egg wash and bread crumbs you can repeat this process.",
                          "ingredients": [
                              {
                                  "id": 18079,
                                  "name": "breadcrumbs",
                                  "localizedName": "breadcrumbs",
                                  "image": "breadcrumbs.jpg"
                              },
                              {
                                  "id": 11529,
                                  "name": "tomato",
                                  "localizedName": "tomato",
                                  "image": "tomato.png"
                              },
                              {
                                  "id": 1123,
                                  "name": "egg",
                                  "localizedName": "egg",
                                  "image": "egg.png"
                              },
                              {
                                  "id": 0,
                                  "name": "dip",
                                  "localizedName": "dip",
                                  "image": ""
                              }
                          ],
                          "equipment": []
                      },
                      {
                          "number": 2,
                          "step": "Heat a large frying pan with the olive oil and place the prepared tomato slices in the pan.  When the tomatoes have a nice golden color gently flip and finish cooking on the other side.  This will take about 3-4 minutes on each side on medium heat.",
                          "ingredients": [
                              {
                                  "id": 10511529,
                                  "name": "tomato slices",
                                  "localizedName": "tomato slices",
                                  "image": "sliced-tomato.jpg"
                              },
                              {
                                  "id": 4053,
                                  "name": "olive oil",
                                  "localizedName": "olive oil",
                                  "image": "olive-oil.jpg"
                              },
                              {
                                  "id": 11529,
                                  "name": "tomato",
                                  "localizedName": "tomato",
                                  "image": "tomato.png"
                              }
                          ],
                          "equipment": [
                              {
                                  "id": 404645,
                                  "name": "frying pan",
                                  "localizedName": "frying pan",
                                  "image": "pan.png"
                              }
                          ],
                          "length": {
                              "number": 4,
                              "unit": "minutes"
                          }
                      },
                      {
                          "number": 3,
                          "step": "Place halved eggplant in the frying pan and sprinkle with dashes of salt and pepper.",
                          "ingredients": [
                              {
                                  "id": 1102047,
                                  "name": "salt and pepper",
                                  "localizedName": "salt and pepper",
                                  "image": "salt-and-pepper.jpg"
                              },
                              {
                                  "id": 11209,
                                  "name": "eggplant",
                                  "localizedName": "eggplant",
                                  "image": "eggplant.png"
                              }
                          ],
                          "equipment": [
                              {
                                  "id": 404645,
                                  "name": "frying pan",
                                  "localizedName": "frying pan",
                                  "image": "pan.png"
                              }
                          ]
                      },
                      {
                          "number": 4,
                          "step": "Let the eggplant saut on one side to a golden color then turn and saut on the other side.  This will take about 3  4 minutes on each side.Plate and finish with the parsley garnish, lemon juice and grated cheese.",
                          "ingredients": [
                              {
                                  "id": 9152,
                                  "name": "lemon juice",
                                  "localizedName": "lemon juice",
                                  "image": "lemon-juice.jpg"
                              },
                              {
                                  "id": 11209,
                                  "name": "eggplant",
                                  "localizedName": "eggplant",
                                  "image": "eggplant.png"
                              },
                              {
                                  "id": 11297,
                                  "name": "parsley",
                                  "localizedName": "parsley",
                                  "image": "parsley.jpg"
                              },
                              {
                                  "id": 1041009,
                                  "name": "cheese",
                                  "localizedName": "cheese",
                                  "image": "cheddar-cheese.png"
                              }
                          ],
                          "equipment": [],
                          "length": {
                              "number": 4,
                              "unit": "minutes"
                          }
                      }
                  ]
              }
          ],
          "spoonacularSourceUrl": "https://spoonacular.com/tomato-cutlets-663588",
          "nutrition": {
              "nutrients": [
                  {
                      "title": "Calories",
                      "name": "Calories",
                      "amount": 383.934,
                      "unit": "kcal"
                  },
                  {
                      "title": "Protein",
                      "name": "Protein",
                      "amount": 19.2966,
                      "unit": "g"
                  },
                  {
                      "title": "Fat",
                      "name": "Fat",
                      "amount": 17.4578,
                      "unit": "g"
                  },
                  {
                      "title": "Carbohydrates",
                      "name": "Carbohydrates",
                      "amount": 41.3603,
                      "unit": "g"
                  }
              ]
          }
      },
      {
          "vegetarian": false,
          "vegan": false,
          "glutenFree": false,
          "dairyFree": false,
          "veryHealthy": true,
          "cheap": false,
          "veryPopular": false,
          "sustainable": false,
          "weightWatcherSmartPoints": 12,
          "gaps": "no",
          "lowFodmap": false,
          "aggregateLikes": 1,
          "spoonacularScore": 87,
          "healthScore": 81,
          "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
          "license": "CC BY 3.0",
          "sourceName": "Foodista",
          "pricePerServing": 280,
          "id": 652716,
          "title": "Mushroom, roasted tomato and garlic pasta",
          "readyInMinutes": 45,
          "servings": 2,
          "sourceUrl": "https://www.foodista.com/recipe/4XTNWW6Q/mushroom-roasted-tomato-and-garlic-pasta",
          "image": "https://spoonacular.com/recipeImages/652716-312x231.jpg",
          "imageType": "jpg",
          "summary": "Mushroom, roasted tomato and garlic pastan is a main course that serves 2. For <b>$2.8 per serving</b>, this recipe <b>covers 27%</b> of your daily requirements of vitamins and minerals. One portion of this dish contains about <b>17g of protein</b>, <b>19g of fat</b>, and a total of <b>437 calories</b>. A mixture of olive oil, cherry tomatoes, rosemary, and a handful of other ingredients are all it takes to make this recipe so tasty. 1 person has tried and liked this recipe. From preparation to the plate, this recipe takes about <b>about 45 minutes</b>. It is brought to you by Foodista. With a spoonacular <b>score of 87%</b>, this dish is outstanding. If you like this recipe, you might also like recipes such as <a href=\"https://spoonacular.com/recipes/roasted-tomato-mushroom-pasta-1023573\">Roasted Tomato & Mushroom Pasta</a>, <a href=\"https://spoonacular.com/recipes/creamy-roasted-garlic-mushroom-pasta-527479\">Creamy Roasted Garlic & Mushroom Pasta</a>, and <a href=\"https://spoonacular.com/recipes/roasted-garlic-tomato-pasta-sauce-617201\">Roasted Garlic Tomato Pasta Sauce</a>.",
          "cuisines": [],
          "dishTypes": [
              "side dish",
              "lunch",
              "main course",
              "main dish",
              "dinner"
          ],
          "diets": [],
          "occasions": [],
          "analyzedInstructions": [
              {
                  "name": "",
                  "steps": [
                      {
                          "number": 1,
                          "step": "Preheat the oven to 180 C.",
                          "ingredients": [],
                          "equipment": [
                              {
                                  "id": 404784,
                                  "name": "oven",
                                  "localizedName": "oven",
                                  "image": "oven.jpg",
                                  "temperature": {
                                      "number": 180,
                                      "unit": "Celsius"
                                  }
                              }
                          ]
                      },
                      {
                          "number": 2,
                          "step": "In a baking dish , toss the tomatoes, garlic, 1 tbsp olive oil, rosemary and chilli flakes. Season with salt and pepper.",
                          "ingredients": [
                              {
                                  "id": 1102047,
                                  "name": "salt and pepper",
                                  "localizedName": "salt and pepper",
                                  "image": "salt-and-pepper.jpg"
                              },
                              {
                                  "id": 1032009,
                                  "name": "red pepper flakes",
                                  "localizedName": "red pepper flakes",
                                  "image": "red-pepper-flakes.jpg"
                              },
                              {
                                  "id": 4053,
                                  "name": "olive oil",
                                  "localizedName": "olive oil",
                                  "image": "olive-oil.jpg"
                              },
                              {
                                  "id": 2036,
                                  "name": "rosemary",
                                  "localizedName": "rosemary",
                                  "image": "rosemary.jpg"
                              },
                              {
                                  "id": 11529,
                                  "name": "tomato",
                                  "localizedName": "tomato",
                                  "image": "tomato.png"
                              },
                              {
                                  "id": 11215,
                                  "name": "garlic",
                                  "localizedName": "garlic",
                                  "image": "garlic.png"
                              }
                          ],
                          "equipment": [
                              {
                                  "id": 404646,
                                  "name": "baking pan",
                                  "localizedName": "baking pan",
                                  "image": "roasting-pan.jpg"
                              }
                          ]
                      },
                      {
                          "number": 3,
                          "step": "Mix well and bake for 25 minutes",
                          "ingredients": [],
                          "equipment": [
                              {
                                  "id": 404784,
                                  "name": "oven",
                                  "localizedName": "oven",
                                  "image": "oven.jpg"
                              }
                          ]
                      },
                      {
                          "number": 4,
                          "step": "Meanwhile, cook the pasta in some salted water. Once cooked drain and keep aside.",
                          "ingredients": [
                              {
                                  "id": 20420,
                                  "name": "pasta",
                                  "localizedName": "pasta",
                                  "image": "fusilli.jpg"
                              },
                              {
                                  "id": 14412,
                                  "name": "water",
                                  "localizedName": "water",
                                  "image": "water.png"
                              }
                          ],
                          "equipment": []
                      },
                      {
                          "number": 5,
                          "step": "Heat 1 tbsp of oil in a pan and cook the white part of the spring onions for about 1-2 minutes. Toss in the mushrooms and cook for 8 - 10 minutes or until the mushrooms have softened.",
                          "ingredients": [
                              {
                                  "id": 11291,
                                  "name": "spring onions",
                                  "localizedName": "spring onions",
                                  "image": "spring-onions.jpg"
                              },
                              {
                                  "id": 11260,
                                  "name": "mushrooms",
                                  "localizedName": "mushrooms",
                                  "image": "mushrooms.png"
                              },
                              {
                                  "id": 4582,
                                  "name": "cooking oil",
                                  "localizedName": "cooking oil",
                                  "image": "vegetable-oil.jpg"
                              }
                          ],
                          "equipment": [
                              {
                                  "id": 404645,
                                  "name": "frying pan",
                                  "localizedName": "frying pan",
                                  "image": "pan.png"
                              }
                          ],
                          "length": {
                              "number": 12,
                              "unit": "minutes"
                          }
                      },
                      {
                          "number": 6,
                          "step": "Add the cooked pasta and the roasted tomatoes and garlic and toss everything together.",
                          "ingredients": [
                              {
                                  "id": 20421,
                                  "name": "cooked pasta",
                                  "localizedName": "cooked pasta",
                                  "image": "fusilli.jpg"
                              },
                              {
                                  "id": 11529,
                                  "name": "tomato",
                                  "localizedName": "tomato",
                                  "image": "tomato.png"
                              },
                              {
                                  "id": 11215,
                                  "name": "garlic",
                                  "localizedName": "garlic",
                                  "image": "garlic.png"
                              }
                          ],
                          "equipment": []
                      },
                      {
                          "number": 7,
                          "step": "Garnish with the rest of the spring onions (the green bit)",
                          "ingredients": [
                              {
                                  "id": 11291,
                                  "name": "spring onions",
                                  "localizedName": "spring onions",
                                  "image": "spring-onions.jpg"
                              }
                          ],
                          "equipment": []
                      },
                      {
                          "number": 8,
                          "step": "Serve with some parmesan on top.",
                          "ingredients": [
                              {
                                  "id": 1033,
                                  "name": "parmesan",
                                  "localizedName": "parmesan",
                                  "image": "parmesan.jpg"
                              }
                          ],
                          "equipment": []
                      }
                  ]
              }
          ],
          "spoonacularSourceUrl": "https://spoonacular.com/mushroom-roasted-tomato-and-garlic-pasta-652716",
          "nutrition": {
              "nutrients": [
                  {
                      "title": "Calories",
                      "name": "Calories",
                      "amount": 436.539,
                      "unit": "kcal"
                  },
                  {
                      "title": "Protein",
                      "name": "Protein",
                      "amount": 17.0534,
                      "unit": "g"
                  },
                  {
                      "title": "Fat",
                      "name": "Fat",
                      "amount": 19.0937,
                      "unit": "g"
                  },
                  {
                      "title": "Carbohydrates",
                      "name": "Carbohydrates",
                      "amount": 52.2545,
                      "unit": "g"
                  }
              ]
          }
      }
  ],
  "offset": 0,
  "number": 10,
  "totalResults": 64
}
  
    return (
        
        <Container>
            <Row className="justify-content-around">
                    <Col md="2"><ProgressBarNutriment title= "Protéines" number={totalProtein} totalNumber={neededNutriments.maxProtein} color='success'/></Col>
                    <Col md="2"><ProgressBarNutriment title= "Glucides" number={totalCarb} totalNumber={neededNutriments.maxCarb} color='warning'/></Col>
                    <Col md="2"><ProgressBarNutriment title= "Lipides" number={totalFat} totalNumber={neededNutriments.maxFat} color='info'/></Col>
            </Row>
            <Row className="mt-5">
                <MealPlanGroupCard breakfast={breakfast} breakfastReload={fetchBreakfast} brLoad={brIsLoading} lunch={lunch} lunchReload={fetchLunch} luLoad={luIsLoading} dinner={dinner} dinnerReload={fetchDinner} diLoad={diIsLoading}></MealPlanGroupCard>
            </Row>
        </Container>
        
    );
};

export default MealPlat;