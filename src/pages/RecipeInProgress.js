import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import './RecipeInProgress.css';

function RecipeInProgress() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const compare = pathname.includes('drink') ? 'drinks' : 'foods';
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const ENDPOINTFOOD = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const ENDPOINTDRINK = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  useEffect(() => {
    const fetchEndpoint = async (URL, compareData) => {
      const request = await fetch(URL);
      const response = await request.json();
      const data = response[compareData][0];

      setRecipeDetails(data);

      const ingredientFilter = object.entries(data)
        .filter((ingredient) => ingredient[0].includes('strIngredient')
      && ingredient[1] !== null && ingredient[1] !== '');

      const measuredFilter = object.entries(data)
        .filter((measured) => measured[0].includes('strIngredient')
        && measured[1] !== null && measured[1] !== '');

      const ingredientList = ingredientFilter
        .map((ingredient, index) => (measuredFilter[index] === null
          ? `${ingredient[1]}` : `${ingredient[1]} - ${measuredFilter[index][1]}`));
      setIngredientsList(ingredientList);
    };

    if (compare === 'foods') {
      fetchEndpoint(ENDPOINTFOOD, 'meals');
    }
    if (compare === 'drinks') {
      fetchEndpoint(ENDPOINTDRINK, 'drinks');
    }
  }, []);

  return (
    <div>
      <img
        src={ compare === 'foods'
          ? recipeDetails.strMealThumb : recipeDetails.strDrinkThumb }
        alt={ compare === 'foods'
          ? recipeDetails.strMealThumb : recipeDetails.strDrinkThumb }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">
        { compare === 'food'
          ? recipeDetails.strMeal : recipeDetails.strDrink }
      </h1>
      <button type="button" data-testid="share-btn">
        <img className="icon" src={ shareIcon } alt="" />
      </button>
      <button type="button" data-testid="favorite-btn">
        <img className="icon" src={ whiteHeartIcon } alt="" />
      </button>
      <p data-testid="recipe-category">
        { ingredientsList.length > 0 && ingredientsList.map((ingredient, index) => (
          <label key={ index } htmlFor={ index }>
            <input
              id={ index }
              type="checkbox"
              data-testid={ `${index}-ingredient-step` }
            />
            {ingredient}
          </label>))}
      </p>
      <p data-testid="instructions">{ recipeDetails.strInstructions }</p>
      <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
    </div>
  );
}

export default RecipeInProgress;
