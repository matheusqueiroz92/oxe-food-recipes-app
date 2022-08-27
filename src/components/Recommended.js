import React from 'react';

const Recommended = ({ drinks, meals }) => {
  const TX = '-recomendation-card';

  if (drinks) {
    return drinks
      .map((e, index) => (
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
        </div>));
  } return meals
    .map((e, index) => (
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
      </div>));
};

export default Recommended;
