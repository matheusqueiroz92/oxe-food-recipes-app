import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import './RecipeInProgress.css';

function RecipeInProgress() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const compare = pathname.includes('drink') ? 'drinks' : 'foods';
  const [handleRecipe, sethandleRecipe] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [checked, setChecked] = useState([]);
  const ENDPOINTFOOD = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const ENDPOINTDRINK = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', {
      cocktails: {
        [id]: [],
      },
      meals: {
        [id]: [],
      },
    });
  });

  useEffect(() => {
    const fetchEndpoint = async (URL, compareData) => {
      const request = await fetch(URL);
      const response = await request.json();
      const data = response[compareData][0];

      sethandleRecipe(data);

      const ingredientFilter = Object.entries(data)
        .filter((ingredient) => ingredient[0].includes('strIngredient')
      && ingredient[1] !== null && ingredient[1] !== '');

      const measuredFilter = Object.entries(data)
        .filter((measured) => measured[0].includes('strMeasure')
        && measured[1] !== null && measured[1] !== '');

      const ingredientList = ingredientFilter
        .map((ingredient, index) => (measuredFilter[index] === null
          ? `${ingredient[1]}` : `${ingredient[1]} - ${measuredFilter[index][1]}`));
      setCheckedList(ingredientList);
    };

    if (compare === 'foods') {
      fetchEndpoint(ENDPOINTFOOD, 'meals');
    }
    if (compare === 'drinks') {
      fetchEndpoint(ENDPOINTDRINK, 'drinks');
    }
  });

  const handleCheck = ({ target }) => {
    let updatedList = [...checked];
    if (target.checked) {
      updatedList = [...checked, target.value];
    } else {
      updatedList.splice(checked.indexOf(target.value), 1);
    }
    setChecked(updatedList);
  };

  const isChecked = (ingredient) => (checked.includes(ingredient)
    ? 'checked-item' : 'not-checked-ingredient');

  return (
    <div>

      <h1 data-testid="recipe-title">
        {compare === 'foods'
          ? handleRecipe.strMeal : handleRecipe.strDrink}
      </h1>
      <div>
        <img
          src={ compare === 'foods'
            ? handleRecipe.strMealThumb : handleRecipe.strDrinkThumb }
          alt={ compare === 'foods'
            ? handleRecipe.strMealThumb : handleRecipe.strDrinkThumb }
          data-testid="recipe-photo"
        />
      </div>
      <h4 data-testid="recipe-category">{ handleRecipe.strCategory }</h4>
      <div className="list-container">
        {
          checkedList.length > 0
          && checkedList.map((ingredient, index) => (
            <label
              key={ index }
              htmlFor={ index }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                value={ ingredient }
                id={ index }
                type="checkbox"
                onChange={ handleCheck }
              />
              <span className={ isChecked(ingredient) }>{ingredient}</span>
            </label>))
        }
      </div>
      <p data-testid="instructions">{handleRecipe.strInstructions}</p>

      <button type="button" data-testid="share-btn">
        <img className="icon" src={ shareIcon } alt="" />
      </button>

      <button type="button" data-testid="favorite-btn">
        <img className="icon" src={ whiteHeartIcon } alt="" />
      </button>
      <p data-testid="recipe-category" />
      <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
    </div>
  );
}

export default RecipeInProgress;
