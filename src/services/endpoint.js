import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
const { setSearchRecipes } = useContext(RecipesContext);

const redirectIngredient = (dataAPI) => {
  const ingredientURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${dataAPI}`;
  return ingredientURL;
};

const redirectIngredientDrink = (dataAPI) => {
  const ingredientURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${dataAPI}`;
  return ingredientURL;
};

const redirectName = (dataAPI) => {
  const nameURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${dataAPI}`;
  return nameURL;
};

const redirectNameDrink = (dataAPI) => {
  const nameURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${dataAPI}`;
  return nameURL;
};

const redirectFirstLetter = (dataAPI) => {
  const firstLetterURL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${dataAPI}`;
  return firstLetterURL;
};

const redirectFirstLetterDrink = (dataAPI) => {
  const firstLetterURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${dataAPI}`;
  return firstLetterURL;
};

export const getMealAPI = async (radioButtons, dataAPI) => {
  let searchResults = '';
  if (radioButtons === 'radio-ingredient') {
    const response = await fetch(redirectIngredient(dataAPI));
    searchResults = await response.json();
  }
  if (radioButtons === 'radio-name') {
    const response = await fetch(redirectName(dataAPI));
    searchResults = await response.json();
  }
  if (radioButtons === 'radio-firstletter') {
    const response = await fetch(redirectFirstLetter(dataAPI));
    searchResults = await response.json();
  }
  return setSearchRecipes(searchResults);
};

export const getDrinkAPI = async (radioButtons, dataAPI) => {
  if (radioButtons === 'radio-ingredient') {
    const response = await fetch(redirectIngredientDrink(dataAPI));
    searchResults = await response.json();
    console.log(searchResults);
    return searchResults;
  }
  if (radioButtons === 'radio-name') {
    const response = await fetch(redirectNameDrink(dataAPI));
    searchResults = await response.json();
    console.log(searchResults);
    return searchResults;
  }
  if (radioButtons === 'radio-firstletter') {
    const response = await fetch(redirectFirstLetterDrink(dataAPI));
    searchResults = await response.json();
    console.log(searchResults);
    return searchResults;
  }
  return setSearchRecipes(searchResults);
};
