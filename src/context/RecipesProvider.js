import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [searchRecipes, setSearchRecipes] = useState({
    init: 0,
    meals: [],
    drinks: [],
  });
  const { Provider } = RecipesContext;

  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const [toogleButton, setToogleButton] = useState(true);

  useEffect(() => {
    const validateInputs = () => {
      const { email, password } = login;
      const SEVEN = 7;
      const MENOS_UM = -1;
      if ((email.search(/\S+@\S+\.\S+/) !== MENOS_UM) && password.length >= SEVEN) {
        setToogleButton(false);
      } else {
        setToogleButton(true);
      }
    };
    validateInputs();
  }, [login]);

  return (
    <Provider
      value={ {
        login,
        setLogin,
        toogleButton,
        setToogleButton,
        searchRecipes,
        setSearchRecipes,
      } }
    >
      { children }
    </Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
