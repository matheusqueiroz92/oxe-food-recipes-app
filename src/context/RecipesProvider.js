import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

const RecipesProvider = ({ children }) => {
  const [searchRecipes, setSearchRecipes] = useState({ init: 0 });
  const { Provider } = RecipesContext;

  const object = {
    searchRecipes,
    setSearchRecipes,
  };

  return (
    <Provider value={ object }>{ children }</Provider>
  );
};

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
