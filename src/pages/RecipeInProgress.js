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
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storage) {
      setLocal(storage);
    }
    console.log(storage);
  }, []);

  useEffect(() => {
    const fetchEndpoint = async (URL, compareData) => {
      const request = await fetch(URL);
      const response = await request.json();
      const data = response[compareData][0];

      sethandleRecipe(data);
      console.log(data);

      const ingredientFilter = Object.entries(data)
        .filter((ingredient) => ingredient[0].includes('strIngredient')
          && ingredient[1] !== null && ingredient[1] !== '');

      const measuredFilter = Object.entries(data)
        .filter((measure) => measure[0].includes('strMeasure'));

      const ingredientList = ingredientFilter
        .map((ingredient, index) => (
          `${ingredient[1]} ${measuredFilter[index][1] === null
            ? '' : measuredFilter[index][1]}`));

      if (compare === 'foods') {
        const newPrev = JSON.parse(localStorage.getItem('inProgressRecipes'));
        setLocal(newPrev);

        setCheckedList(ingredientList);
      } const newPrev = JSON.parse(localStorage.getItem('inProgressRecipes'));
      setLocal(newPrev);
      setCheckedList(ingredientList);
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
    if (!newPrev) return;
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

  const handleCheckComida = ({ target }) => {
    console.log(target.value);
    if (compare === 'foods') {
      const prev = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (target.checked) {
        if (!prev) {
          const test = { meals: { [id]: [target.value] } };
          return localStorage.setItem('inProgressRecipes', JSON.stringify(test));
        }
        prev.meals[id] = [...prev.meals[id], target.value];
        localStorage.setItem('inProgressRecipes', JSON.stringify(prev));
        setLocal(prev);
      } else {
        const newPrev = prev.meals[id].filter((item) => item !== target.value);
        prev.meals[id] = newPrev;
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

  const handleCheck = ({ target }) => {
    console.log(target.value);
    if (compare === 'drinks') {
      const prev = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (target.checked) {
        if (!prev) {
          const test = { cocktails: { [id]: [target.value] } };
          return localStorage.setItem('inProgressRecipes', JSON.stringify(test));
        }
        prev.cocktails[id] = [...prev.cocktails[id], target.value];
        localStorage.setItem('inProgressRecipes', JSON.stringify(prev));
        setLocal(prev);
        console.log(prev);
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

  const isChecked = (item) => {
    if (compare === 'foods' && local) {
      return local.meals[id].includes(item)
        ? 'checked-item' : 'not-checked-ingredient';
    }
  };
  const isCheckedDrink = (item) => {
    if (compare === 'drinks' && local) {
      return local.cocktails[id].includes(item)
        ? 'checked-item' : 'not-checked-ingredient';
    }
  };

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
        { checkedList.length > 0 && compare === 'foods'
          && checkedList.map((item, index) => (
            <label
              key={ index }
              htmlFor={ index }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                value={ item }
                id={ index }
                type="checkbox"
                onChange={ handleCheckComida }
                checked={
                  local && local.meals[id].includes(item)
                }
              />
              <span className={ isChecked(item) }>{item}</span>
            </label>))}
        { checkedList.length > 0 && compare === 'drinks'
          && checkedList.map((item, index) => (
            <label
              key={ index }
              htmlFor={ index }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                value={ item }
                id={ index }
                type="checkbox"
                onChange={ handleCheck }
                checked={
                  local && local.cocktails[id].includes(item)
                }
              />
              <span className={ isCheckedDrink(item) }>{item}</span>
            </label>))}
      </div>
      <p data-testid="instructions">{handleRecipe.strInstructions}</p>
      <LikeAndShare history={ history } data={ handleRecipe } />
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
