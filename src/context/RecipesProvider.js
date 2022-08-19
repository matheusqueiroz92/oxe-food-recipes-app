import React from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

const RecipesProvider = ({ children }) => {
  const { Provider } = RecipesContext;
  return (
    <Provider>{ children }</Provider>
  );
};

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
