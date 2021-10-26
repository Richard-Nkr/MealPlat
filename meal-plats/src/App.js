import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import SuggestionLayout from './components/SuggestionLayout/SuggestionLayout';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <SuggestionLayout/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
