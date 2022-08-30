import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './recipes.css';

function Recipes() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState({
    meals: [],
    drinks: [],
  });
  const [toggleBtn, setToggleBtn] = useState(true);
  const FIVE = 5;
  const TWELVE = 12;

  const getMealApi = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(URL);
    const data = await response.json();
    const { meals } = data;
    setRecipes(meals);
  };

  const getDrinkApi = async () => {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(URL);
    const data = await response.json();
    const { drinks } = data;
    setRecipes(drinks);
  };

  useEffect(() => {
    if (pathname === '/foods') {
      const getCategoriesApi = async () => {
        const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
        const response = await fetch(URL);
        const data = await response.json();
        const { meals } = data;
        setCategories((prevCategories) => ({
          ...prevCategories,
          meals,
        }));
      };
      getMealApi();
      getCategoriesApi();
    } if (pathname === '/drinks') {
      const getCategoriesApi = async () => {
        const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
        const response = await fetch(URL);
        const data = await response.json();
        const { drinks } = data;
        setCategories((prevCategories) => ({
          ...prevCategories,
          drinks,
        }));
      };
      getDrinkApi();
      getCategoriesApi();
    }
  }, [pathname]);

  const handleCategoryMeals = async ({ target: { name } }) => {
    if (toggleBtn) {
      const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`;
      const response = await fetch(URL);
      const data = await response.json();
      const { meals } = data;
      setRecipes(meals);
      console.log(toggleBtn);
    } else {
      getMealApi();
    }
    setToggleBtn(!toggleBtn);
  };

  const handleCategoryDrinks = async ({ target: { name } }) => {
    if (toggleBtn) {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`;
      const response = await fetch(URL);
      const data = await response.json();
      const { drinks } = data;
      setRecipes(drinks);
      setToggleBtn(!toggleBtn);
      console.log(toggleBtn);
    } else {
      getDrinkApi();
    }
    setToggleBtn(!toggleBtn);
  };

  const clearCategories = () => {
    if (pathname === '/foods') {
      getMealApi();
    } if (pathname === '/drinks') {
      getDrinkApi();
    }
  };

  return (
    <div className="recipes">
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ clearCategories }
      >
        All
      </button>
      <div data-testid="categoryFoods">
        { pathname === '/foods' ? categories.meals.map((category, index) => (
          <button
            type="button"
            key={ index }
            name={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ handleCategoryMeals }
          >
            { category.strCategory }
          </button>)).filter((element, idx) => idx < FIVE)
          : categories.drinks.map((category, index) => (
            <button
              type="button"
              key={ index }
              name={ category.strCategory }
              data-testid={ `${category.strCategory}-category-filter` }
              onClick={ handleCategoryDrinks }
            >
              { category.strCategory }
            </button>)).filter((element, idx) => idx < FIVE) }
      </div>
      <div className="searchRecipes" data-testid="cardsRecipes">
        { pathname === '/foods' ? (recipes.map((recipe, index) => (
          <Link
            to={ `/foods/${recipe.idMeal}` }
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
          </Link>
        )).filter((element, idx) => idx < TWELVE))
          : recipes.map((recipe, index) => (
            <Link
              to={ `/drinks/${recipe.idDrink}` }
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
            </Link>
          )).filter((element, idx) => idx < TWELVE) }
      </div>
    </div>
  );
}

export default Recipes;
