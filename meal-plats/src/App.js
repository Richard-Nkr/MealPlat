import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from "./pages/Home/Home";
import RecipeCard from "./pages/RecipeCard/RecipeCard";
import { constants } from './constants';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={constants.PATHS.HOME}>
          <Home/>
        </Route>
        <Route path={constants.PATHS.RECIPE_CARD}>
          <RecipeCard/>
        </Route>
      </Switch>
    </Router>

  );
}

export default App;



