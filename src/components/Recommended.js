import PropTypes from 'prop-types';
import React from 'react';
import Carousel from 'react-elastic-carousel';

const Recommended = ({ drinks, meals }) => {
  const TX = '-recomendation-card';
  const SWIP_NUMBER = 2;

  if (drinks) {
    return (
      <Carousel itemsToShow={ SWIP_NUMBER } itemsToScroll={ SWIP_NUMBER }>
        {drinks.map((e, index) => (
          <div key={ index }>
            <h5 data-testid={ `${index}-recomendation-title` }>{e.strDrink}</h5>
            <img
              alt="drink recommendation"
              key={ index }
              src={ e.strDrinkThumb }
              data-testid={ `${index}${TX}` }
              width={ 60 }
              height={ 60 }
            />
          </div>))}
      </Carousel>
    );
  } return (
    <Carousel itemsToShow={ SWIP_NUMBER } itemsToScroll={ SWIP_NUMBER }>
      { meals.map((e, index) => (
        <div key={ index }>
          <h5 data-testid={ `${index}-recomendation-title` }>{e.strMeal}</h5>
          <img
            alt="food recommendation"
            key={ index }
            data-testid={ `${index}${TX}` }
            src={ e.strMealThumb }
            width={ 60 }
            height={ 60 }
          />
        </div>)) }
    </Carousel>
  );
};

Recommended.propTypes = {
  drinks: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  meals: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

export default Recommended;
