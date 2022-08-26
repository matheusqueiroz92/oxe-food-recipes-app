import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function SearchBar() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const { setSearchRecipes } = useContext(RecipesContext);
  const [searchBar, setSearchBar] = useState('');
  const [radioButtons, setRadioButtons] = useState('');

  const alertNotFound = 'Sorry, we haven\'t found any recipes for these filters.';
  
  const getMealApi = async (text, radio) => {
    let endpoint = '';
    if (radio === 'radio-ingredient') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${text}`;
    }
    if (radio === 'radio-name') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`;
    }
    if (radio === 'radio-firstletter') {
      if (radio.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${text[0]}`;
    }
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      if (data.meals === null) {
        throw new Error(alertNotFound);
      }
      return setSearchRecipes(data);
    } catch (error) {
      global.alert(error.message);
    }
  };

  const getDrinkApi = async (text, radio) => {
    let endpoint = '';
    if (radio === 'radio-ingredient') {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${text}`;
    }
    if (radio === 'radio-name') {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${text}`;
    }
    if (radio === 'radio-firstletter') {
      if (radio.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${text[0]}`;
    }
    const response = await fetch(endpoint);
    const data = await response.json();
    const { drinks } = data;
    setSearchRecipes((prevDrinks) => ({
      ...prevDrinks,
      drinks,
    }));
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      if (data.drinks === null) {
        throw new Error(alertNotFound);
      }
      return setSearchRecipes(data);
    } catch (error) {
      global.alert(error.message);
    }
  };

  // useEffect(() => {
  //   if (searchRecipes.drinks.length < 1) {
  //     global.alert('Sorry, we haven\'t found any recipes for these filters.');
  //   }
  // }, [getMealApi, getDrinkApi]);

  return (
    <section>
      <label htmlFor="searchBar">
        <input
          type="text"
          data-testid="search-input"
          value={ searchBar }
          onChange={ ({ target }) => {
            setSearchBar(target.value);
          } }
          id="searchBar"
        />
      </label>

      <div>
        <label htmlFor="radios">
          <input
            id="inputradio-ingredient"
            type="radio"
            name="radios"
            data-testid="ingredient-search-radio"
            value="radio-ingredient"
            onClick={ ({ target }) => {
              setRadioButtons(target.value);
            } }
          />
          Ingredient

          <input
            id="inputradio-name"
            type="radio"
            name="radios"
            data-testid="name-search-radio"
            value="radio-name"
            onClick={ ({ target }) => {
              setRadioButtons(target.value);
            } }
          />
          Name

          <input
            id="inputradio-firstletter"
            type="radio"
            name="radios"
            data-testid="first-letter-search-radio"
            value="radio-firstletter"
            onClick={ ({ target }) => {
              setRadioButtons(target.value);
            } }
          />
          First letter
        </label>
      </div>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => {
          if (pathname === '/foods') {
            getMealApi(searchBar, radioButtons);
          }
          if (pathname === '/drinks') {
            getDrinkApi(searchBar, radioButtons);
          }
        } }
      >
        Search
      </button>
    </section>
  );
}

export default SearchBar;
