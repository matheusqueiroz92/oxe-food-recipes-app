import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetails = ({ history }) => {
  const [details, setDetails] = useState();
  const id = useParams();
  // console.log(id);
  console.log(details);

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

    // Fonte da funcao youtubeParser https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
    // const youtubeParser = (url) => {
    //   const ELEVEN = 11;
    //   const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    //   const match = url.match(regExp);
    //   return (match && match[7].length === ELEVEN) ? match[7] : false;
    // };

    // const renderVideo = (url) => {
    //   const videoId = youtubeParser(url);
    //   return `https://www.youtube.com/embed/${videoId}`;
    // };

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
        <p data-testid="instructions">{ details.strInstructions }</p>
        <iframe
          title="Recipe Video"
          width="420"
          height="315"
          data-testid="video"
          // src={ renderVideo(details.strYoutube) }
        />
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
