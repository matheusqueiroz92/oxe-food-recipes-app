import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import copyThing from './ClipBoardCopy';

function LikeAndShare({ history, data }) {
  const { pathname } = history.location;
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  useEffect(() => {
    if (pathname.includes('foods')) {
      if (favorites.length > 0) {
        const verify = favorites.some((element) => element.id === data.idMeal);
        setFavorite(verify);
      } else {
        setFavorite(false);
      }
    } else if (favorites.length > 0) {
      const verify = favorites.some((element) => element.id === data.idDrink);
      setFavorite(verify);
    } else {
      setFavorite(false);
    }
  }, [pathname, data.idMeal, data.idDrink, favorites]);

  const clickCopy = () => {
    if (pathname.includes('foods')) {
      copyThing(`http://localhost:3000/foods/${data.idMeal}`);
    } else {
      copyThing(`http://localhost:3000/drinks/${data.idDrink}`);
    }
    setCopied(true);
  };

  const {
    idMeal,
    idDrink,
    strArea,
    strCategory,
    strAlcoholic,
    strMeal,
    strDrink,
    strMealThumb,
    strDrinkThumb } = data;

  const favoritedFoods = {
    id: idMeal,
    type: 'food',
    nationality: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
  };

  const favoritedDrinks = {
    id: idDrink,
    type: 'drink',
    nationality: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
  };

  const isFavorite = () => {
    if (favorite === false) {
      if (pathname.includes('foods')) {
        favorites.push(favoritedFoods);
        localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
      } else {
        favorites.push(favoritedDrinks);
        localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
      }
    } else if (pathname.includes('foods')) {
      const filterFavorites = favorites.filter((el) => el.id !== data.idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filterFavorites));
    } else { /* pagina drinks */
      const filterFavorites = favorites.filter((el) => el.id !== data.idDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filterFavorites));
    }
    setFavorite(!favorite);
  };

  return (
    <div>
      <button
        type="button"
        onClick={ clickCopy }
      >
        <img
          className="icon"
          src={ shareIcon }
          alt="share"
          data-testid="share-btn"
        />
      </button>
      <button
        type="button"
        onClick={ isFavorite }
      >
        <img
          className="icon"
          src={ favorite ? blackHeartIcon : whiteHeartIcon }
          alt="favorite"
          data-testid="favorite-btn"
        />
      </button>
      { copied ? <span>Link copied!</span> : null }
    </div>
  );
}

LikeAndShare.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
  data: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default LikeAndShare;
