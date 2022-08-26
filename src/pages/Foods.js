import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import RecipesContext from '../context/RecipesContext';

function Foods({ history }) {
  const { searchRecipes } = useContext(RecipesContext);
  const DOZE = 12;

  return (
    <div>
      <div>
        <Header title="Foods" profile search history={ history } />
      </div>
      <div>
        { searchRecipes.meals.length < 1 ? <Recipes />
          : <p /> }
      </div>
      { searchRecipes.meals.length === 1
        ? history.push(`/foods/${searchRecipes.meals[0].idMeal}`)
        : (
          <div className="search-recipes">
            { searchRecipes.meals.length > 1 ? searchRecipes.meals
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
                    {recipe.strMeal}
                  </p>
                  <img
                    className="recipe-img"
                    key={ index }
                    src={ recipe.strMealThumb }
                    alt={ recipe.strMeal }
                    data-testid={ `${index}-card-img` }
                  />
                </div>
              )).filter((element, idx) => idx < DOZE)
              : <p /> }
          </div>)}
      <div><Footer /></div>
    </div>
  );
}

Foods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Foods;
