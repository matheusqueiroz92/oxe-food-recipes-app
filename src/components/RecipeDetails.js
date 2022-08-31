import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import LikeAndShare from './LikeAndShare';
import Recommended from './Recommended';

const RecipeDetails = ({ history }) => {
  const { doneRecipes } = useContext(RecipesContext);
  const [details, setDetails] = useState();
  const [recomendations, setRecomendations] = useState();
  const { pathname } = history.location;
  const isFood = pathname.includes('foods');
  const id = useParams();

  useEffect(() => {
    const prevLocal = localStorage.getItem('user');
    console.log(prevLocal);
    const getDetails = async () => {
      const URL = `https://www.the${isFood ? 'meal' : 'cocktail'}db.com/api/json/v1/1/lookup.php?i=${id.id}`;
      const response = await fetch(URL);
      const data = await response.json();
      setDetails(isFood ? data.meals[0] : data.drinks[0]);
    };

    const getRecomendations = async () => {
      const DRINKS_RECOMENDATIONS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const FOODS_RECOMENDATIONS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(isFood ? DRINKS_RECOMENDATIONS : FOODS_RECOMENDATIONS);
      const data = await response.json();
      setRecomendations(data);
    };
    getDetails();
    getRecomendations();
  });

  // Fonte de onde peguei como fazer esse filtro dentro do objeto: https://stackabuse.com/how-to-filter-an-object-by-key-in-javascript/
  const filterObject = (filter) => Object.keys(details)
    .filter((key) => key.includes(filter))
    .reduce((obj, key) => Object.assign(obj, {
      [key]: details[key],
    }), {});

  const ingridientsAndMeasures = () => {
    const INGREDIENTS = Object.values(filterObject('Ingredient'));
    const MEASURES = Object.values(filterObject('Measure'));
    const newArr = [];
    for (let i = 0; i < INGREDIENTS.length; i += 1) {
      if (MEASURES[i] && INGREDIENTS[i] !== 'null') {
        newArr.push(`${MEASURES[i]} ${INGREDIENTS[i]}`);
      }
      if (MEASURES[i] === 'null' && INGREDIENTS[i] !== 'null') {
        newArr.push(INGREDIENTS[i]);
      }
    }
    return newArr;
  };

  const renderFoodDetails = () => {
    const RECOMMENDED_QUANTITY = 6;
    const renderRecomendations = () => {
      if (isFood) {
        return (Recommended({
          drinks: recomendations.drinks.splice(0, RECOMMENDED_QUANTITY) }));
      } return (Recommended({
        meals: recomendations.meals.splice(0, RECOMMENDED_QUANTITY) }));
    };

    return (
      <div>
        <h2 data-testid="recipe-title">
          {
            isFood ? details.strMeal : details.strDrink
          }
        </h2>
        <img
          alt="recipe"
          src={ isFood ? details.strMealThumb : details.strDrinkThumb }
          data-testid="recipe-photo"
          style={ { width: 200, height: 200 } }
        />
        { ingridientsAndMeasures()
          .map((ingredient, index) => {
            const testid = `${index}-ingredient-name-and-measure`;
            if (ingredient !== '') {
              return (<p key={ index } data-testid={ testid }>{ingredient}</p>);
            } return true;
          }) }
        <p
          data-testid="recipe-category"
        >
          { isFood ? details.strCategory : details.strAlcoholic }

        </p>
        <p data-testid="instructions">{ details.strInstructions }</p>
        <LikeAndShare history={ history } />
        { isFood && <iframe
          title="Recipe Video"
          width="420"
          height="315"
          data-testid="video"
          src={ details.strYoutube }
        />}
        <button
          style={ { position: 'fixed', bottom: 0 } }
          type="button"
          data-testid="start-recipe-btn"
          disabled={ doneRecipes.id === id.id }
          onClick={ () => history.push(`${pathname}/in-progress`) }
        >
          Continue Recipe
        </button>
        <div className="recomendationsContainer">
          { recomendations && renderRecomendations() }
        </div>
      </div>
    );
  };

  return (
    <div>
      { details && renderFoodDetails() }
    </div>
  );
};

RecipeDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.shape,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeDetails;
