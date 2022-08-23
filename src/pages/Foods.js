import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';

function Foods() {
  return (
    <>
      <div>foods</div>
      <Footer />
    </>
  );
}
import Header from '../components/Header';

const Foods = ({ history }) => (
  <div>
    <Header title="Foods" profile search history={ history } />
  </div>
);

Foods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Foods;
