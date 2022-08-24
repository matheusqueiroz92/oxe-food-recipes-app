import React, { useEffect } from 'react';

const RecipeDetails = () => {
  // const [details, setDetails] = useState();

  useEffect(() => {
    const getDetails = async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977';
      const response = await fetch(URL);
      const data = await response.json();
      return console.log(data.meals[0].idMeal);
    };

    getDetails();
  }, []);

  return (
    <div>
      <p>Entrei!</p>
    </div>
  );
};

export default RecipeDetails;
