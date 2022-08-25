import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeDetails from '../components/RecipeDetails';

function Foods({ history }) {
  return (
    <>
      <div>
        <Header title="Foods" profile search history={ history } />
        <RecipeDetails />
      </div>
      <div><Footer /></div>
    </>
  );
}

Foods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Foods;
