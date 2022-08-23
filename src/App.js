import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';

import Drinks from './pages/Drinks';
import FoodRecipe from './pages/FoodRecipe';
import DrinkRecipe from './pages/DrinkRecipe';
import FoodInProgress from './pages/FoodInProgress';
import DrinkInProgress from './pages/DrinkInProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/foods" component={ Foods } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/foods/{id-da-receita}" component={ FoodRecipe } />
      <Route exact path="/drinks/{id-da-receita}" component={ DrinkRecipe } />
      <Route
        exact
        path="/foods/{id-da-receita}/in-progress"
        component={ FoodInProgress }
      />
      <Route
        exact
        path="/drinks/{id-da-receita}/in-progress"
        component={ DrinkInProgress }
      />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;
