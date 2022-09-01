import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import LikeAndShare from '../components/LikeAndShare';
import './RecipeInProgress.css';

function RecipeInProgress() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();
  const compare = pathname.includes('drink') ? 'drinks' : 'foods';
  const [handleRecipe, sethandleRecipe] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [checked, setChecked] = useState([]);
  const [disableBtn, setDisableBtn] = useState(false);
  const [local, setLocal] = useState({});
  const ENDPOINTFOOD = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const ENDPOINTDRINK = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {},
      meals: {},
    }));
    const prev = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (prev === null) {
      if (compare === 'drinks') {
        return localStorage.setItem('inProgressRecipes', JSON.stringify({
          cocktails: { [id]: [] },
          meals: {},
        }));
      } return localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: { [id]: [] },
      }));
    } if (compare === 'drinks') {
      return localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...prev,
        cocktails: { [id]: [] },
        meals: {},
      }));
    } return localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...prev,
      cocktails: {},
      meals: { [id]: [] },
    }));
  }, []);

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
        .filter((measure) => measure[0].includes('strMeasure'));

      const ingredientList = ingredientFilter
        .map((ingredient, index) => (
          `${ingredient[1]} ${measuredFilter[index][1] === null
            ? '' : measuredFilter[index][1]}`));
      console.log(ingredientList);

      if (compare === 'foods') {
        const newPrev = JSON.parse(localStorage.getItem('inProgressRecipes'));
        setLocal(newPrev);

        const ingredientLocal = ingredientList.map((item) => ({
          ingredient: item,
          check: newPrev.meals[id].includes(item),
        }));
        setCheckedList(ingredientLocal);
      } else {
        const newPrev = JSON.parse(localStorage.getItem('inProgressRecipes'));
        setLocal(newPrev);

        const ingredientLocal = ingredientList.map((item) => ({
          ingredient: item,
          check: newPrev.cocktails[id].includes(item),
        }));
        setCheckedList(ingredientLocal);
      }
    };

    if (compare === 'foods') {
      fetchEndpoint(ENDPOINTFOOD, 'meals');
    }

    if (compare === 'drinks') {
      fetchEndpoint(ENDPOINTDRINK, 'drinks');
    }
  }, []);

  const enableCheck = () => {
    const newPrev = JSON.parse(localStorage.getItem('inProgressRecipes'));
    // console.log(newPrev);

    if (compare === 'foods' && newPrev.meals[id].length === checkedList.length) {
      return setDisableBtn(true);
    }

    if (compare === 'drinks'
      && newPrev.cocktails[id].length === checkedList.length) {
      return setDisableBtn(true);
    }
  };

  useEffect(() => {
    enableCheck();
  }, [local, checkedList]);

  const handleCheck = ({ target }) => {
    if (compare === 'foods') {
      const prev = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (target.checked) {
        prev.meals[id] = [...prev.meals[id], target.value];
        localStorage.setItem('inProgressRecipes', JSON.stringify(prev));
        setLocal(prev);
      } else {
        const newPrev = prev.meals[id].filter((item) => item !== target.value);
        prev.meals[id] = newPrev;
        localStorage.setItem('inProgressRecipes', JSON.stringify(prev));
        setLocal(prev);
      }
    } else {
      const prev = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (target.checked) {
        prev.cocktails[id] = [...prev.cocktails[id], target.value];
        localStorage.setItem('inProgressRecipes', JSON.stringify(prev));
        setLocal(prev);
      } else {
        const newPrev = prev.cocktails[id].filter((item) => item !== target.value);
        prev.cocktails[id] = newPrev;
        localStorage.setItem('inProgressRecipes', JSON.stringify(prev));
        setLocal(prev);
      }
    }
    let updatedList = [...checked];
    if (target.checked) {
      updatedList = [...checked, target.value];
    } else {
      updatedList.splice(checked.indexOf(target.value), 1);
    }
    setChecked(updatedList);
  };

  const isChecked = (item) => (checked.includes(item)
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
      <h4 data-testid="recipe-category">
        { handleRecipe.strCategory }
      </h4>
      <div className="list-container">
        {
          checkedList.length > 0 && compare === 'foods'
          && checkedList.map((item, index) => (
            <label
              key={ index }
              htmlFor={ index }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                value={ item.ingredient }
                id={ index }
                type="checkbox"
                onChange={ handleCheck }
                checked={
                  local.meals[id].includes(item.ingredients) ? item.check : false
                }
              />
              <span className={ isChecked(item.ingredient) }>{item.ingredient}</span>
            </label>))
        }
        {

          checkedList.length > 0 && compare === 'drinks'
          && checkedList.map((item, index) => (
            <label
              key={ index }
              htmlFor={ index }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                value={ item.ingredient }
                id={ index }
                type="checkbox"
                onChange={ handleCheck }
                checked={
                  local.cocktails[id].includes(item) ? item.check : false
                }
              />
              <span className={ isChecked(item.ingredient) }>{item.ingredient}</span>
            </label>))
        }
      </div>
      <p data-testid="instructions">{handleRecipe.strInstructions}</p>
      <LikeAndShare pathname={ pathname } />
      <p data-testid="recipe-category" />
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !disableBtn }
        onClick={ () => history.push('/done-recipes') }
      >
        Finish Recipe
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeInProgress;
