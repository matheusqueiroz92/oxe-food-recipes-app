import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function SearchBar() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const { setSearchRecipes } = useContext(RecipesContext);
  const [searchBar, setSearchBar] = useState('');
  const [radioButtons, setRadioButtons] = useState('');

  const handleSearch = ({ target: { value } }) => {
    setSearchBar(value);
    console.log(searchBar);
  };

  const redirectIngredient = (ingredient) => {
    const ingredientURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    return ingredientURL;
  };

  const redirectName = (name) => {
    const nameURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`;
    return nameURL;
  };

  const redirectFirstLetter = (firstLetter) => {
    const firstLetterURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${firstLetter}`;
    return firstLetterURL;
  };

  const handleClick = async () => {
    if (radioButtons === 'radio-ingredient') {
      console.log('entrou');
      const response = await fetch(redirectIngredient(searchBar));
      const ingredientURL = await response.json();
      return ingredientURL;
    }
    if (radioButtons === 'radio-name') {
      const response = await fetch(redirectName(searchBar));
      const nameURL = await response.json();
      return nameURL;
    }
    if (radioButtons === 'radio-firstletter') {
      if (searchBar.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      const response = await fetch(redirectFirstLetter(searchBar));
      const firstLetter = await response.json();
      return firstLetter;
    }
  };

  return (
    <section>
      <img
        alt="search"
        data-testid="search-top-btn"
      />

      <label htmlFor="searchBar">
        <input
          type="text"
          data-testid="search-input"
          value={ searchBar }
          onChange={ ({ target }) => {
            setSearchBar(target.value);
            console.log(searchBar);
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
              console.log(radioButtons);
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
              console.log(radioButtons);
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
              console.log(radioButtons);
            } }
          />
          First letter
        </label>
      </div>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleClick() }
      >
        Search
      </button>
    </section>
  );
}

export default SearchBar;
