import React, { useEffect, useState } from 'react';

const RecipeDetails = () => {
  const [details, setDetails] = useState();

  useEffect(() => {
    const getDetails = async () => {
      const TEST_RECIPE = '52977';
      const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${TEST_RECIPE}`;
      const response = await fetch(URL);
      const data = await response.json();
      setDetails(data.meals[0]);
    };

    getDetails();
  }, []);

  // Fonte de onde peguei como fazer esse filtro dentro do objeto: https://stackabuse.com/how-to-filter-an-object-by-key-in-javascript/
  const renderDetails = () => {
    const ingridientsAndMeasures = Object.keys(details)
      .filter((key) => key.includes('Ingredient'))
      .reduce((obj, key) => Object.assign(obj, {
        [key]: details[key],
      }), {});

    return (
      <div>
        <h2 data-testid="recipe-title">{ details.strMeal }</h2>
        <img
          alt="meal"
          src={ details.strMealThumb }
          data-testid="recipe-photo"
          style={ { width: 200, height: 200 } }
        />
        { details && Object
          .values(ingridientsAndMeasures)
          .map((ingredient, index) => {
            const testid = `${index}-ingredient-name-and-measure`;
            if (ingredient !== '') {
              return (<p key={ index } data-testid={ testid }>{ingredient}</p>);
            } return true;
          }) }
        <p data-testid="recipe-category">{ details.strCategory }</p>
      </div>
    );
  };

  return (
    <div>
      { details && renderDetails() }
    </div>
  );
};

export default RecipeDetails;
