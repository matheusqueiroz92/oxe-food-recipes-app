import React from 'react';

const Recommended = ({ drinks, meals }) => {
  const TX = '-recomendation-card';

  if (drinks) {
    return drinks
      .map((e, index) => (
        <p
          key={ index }
          data-testid={ `${index}${TX}` }
        >
          {e.strDrink}
        </p>));
  } return meals
    .map((e, index) => (
      <p
        key={ index }
        data-testid={ `${index}${TX}` }
      >
        {e.strMeal}
      </p>));
};

export default Recommended;
