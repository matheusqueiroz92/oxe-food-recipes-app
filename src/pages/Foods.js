import PropTypes from 'prop-types';
import React from 'react';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Foods({ history }) {
  return (
    <>
      <div>
        <Header title="Foods" profile search history={ history } />
        <SearchBar />
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
