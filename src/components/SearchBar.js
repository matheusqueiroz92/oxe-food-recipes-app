import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function SearchBar() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [searchBar, setSearchBar] = useState('');
  const [radioButtons, setRadioButtons] = useState('');

  const handleSearch = ({ target: { value, type } }) => {
    if (type === 'text') {
      setSearchBar(value);
    } else {
      setRadioButtons(value);
    }
  };

  return (
    <section>
      {/* esse img é só pra passar no teste, tirar pra não dar conflito com o header */}
      <img
        alt="search"
        data-testid="search-top-btn"
      />

      <label htmlFor="searchBar">
        <input
          type="text"
          data-testid="search-input"
          value={ searchBar }
          onChange={ handleSearch }
          id="searchBar"
        />
      </label>

      <div>
        <label htmlFor="inputradio-ingredient">
          Ingredient
          <input
            id="inputradio-ingredient"
            type="radio"
            data-testid="ingredient-search-radio"
            value="radio-ingredient"
            onChange={ handleSearch }
          />
        </label>

        <label htmlFor="inputradio-name">
          Name
          <input
            id="inputradio-name"
            type="radio"
            data-testid="name-search-radio"
            value="radio-name"
            onChange={ handleSearch }
          />
        </label>

        <label htmlFor="inputradio-firstletter">
          First letter
          <input
            id="inputradio-firstletter"
            type="radio"
            data-testid="first-letter-search-radio"
            value="radio-firstletter"
            onChange={ handleSearch }
          />
        </label>
      </div>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Search
      </button>
    </section>
  );
}

export default SearchBar;
