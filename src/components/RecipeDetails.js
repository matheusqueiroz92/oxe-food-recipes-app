import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetails = ({ history }) => {
  const [details, setDetails] = useState();
  const [recomendations, setRecomendations] = useState();
  const { pathname } = history.location;
  const isFood = pathname.includes('foods');
  const id = useParams();

  useEffect(() => {
    const getDetails = async () => {
      // const TEST_RECIPE_ID = '52997';
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
  }, []);

  // Fonte de onde peguei como fazer esse filtro dentro do objeto: https://stackabuse.com/how-to-filter-an-object-by-key-in-javascript/
  const renderFoodDetails = () => {
    const filterObject = (filter) => Object.keys(details)
      .filter((key) => key.includes(filter))
      .reduce((obj, key) => Object.assign(obj, {
        [key]: details[key],
      }), {});

    const INGREDIENTS = Object.values(filterObject('Ingredient'));
    const MEASURES = Object.values(filterObject('Measure'));

    const ingridientsAndMeasures = () => {
      const newArr = [];
      for (let i = 0; i < INGREDIENTS.length; i += 1) {
        newArr.push(`${MEASURES[i]} ${INGREDIENTS[i]}`);
      }
      return newArr;
    };

    const renderRecomendations = () => {
      if (isFood) {
        return (recomendations.drinks.map((e, index) => <p key={ index } data-testid={ `${index}-recomendation-card` }>{e.strDrink}</p>));
      } return (recomendations.meals.map((e, index) => <p key={ index } data-testid={ `${index}-recomendation-card` }>{e.strMeal}</p>));
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
        { isFood && <iframe
          title="Recipe Video"
          width="420"
          height="315"
          data-testid="video"
          src={ details.strYoutube }
        />}
        { recomendations && renderRecomendations() }
      </div>
    );
  };

  if (recomendations) {
    console.log(recomendations.meals);
  }

  return (
    <div>
      { details && renderFoodDetails() }
    </div>
  );
};

RecipeDetails.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeDetails;
