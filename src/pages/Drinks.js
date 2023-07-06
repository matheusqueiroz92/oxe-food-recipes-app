import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import RecipesContext from '../context/RecipesContext';
import './Drinks.css';

function Drinks({ history }) {
  const { searchRecipes } = useContext(RecipesContext);
  const DOZE = 12;

  return (
    <div>
      <div>
        <Header title="Drinks" profile search history={ history } />
      </div>
      <div>
        { searchRecipes.drinks.length < 1 ? <Recipes />
          : <p /> }
      </div>
      { searchRecipes.drinks.length === 1
        ? history.push(`/drinks/${searchRecipes.drinks[0].idDrink}`)
        : (
          <div>
            { searchRecipes.drinks.length > 1 ? searchRecipes.drinks
              .map((recipe, index) => (
                <div
                  key={ `d ${index}` }
                  className="card-recipe"
                  data-testid={ `${index}-recipe-card` }
                >
                  <p
                    key={ `p ${index}` }
                    data-testid={ `${index}-card-name` }
                  >
                    {recipe.strDrink}
                  </p>
                  <img
                    className="recipe-img"
                    key={ index }
                    src={ recipe.strDrinkThumb }
                    alt={ recipe.strDrink }
                    data-testid={ `${index}-card-img` }
                  />
                </div>
              )).filter((element, idx) => idx < DOZE)
              : <p /> }
          </div>) }
      <div><Footer /></div>
    </div>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Drinks;
