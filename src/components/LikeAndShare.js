import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function LikeAndShare({ history }) {
  const { id } = useParams();
  const { pathname } = history.location;
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const recipesFavorites = localStorage.getItem('favoriteRecipes');
    // se o id da receita estiver em recipesFavorites o coração tem que estar preenchido
    // se não tem que estar vazio
  });

  const isFavorite = () => {
    setFavorite(!favorite);
    if (favorite === true) {
      localStorage.setItem('favoriteRecipes');
    } else {
      localStorage.removeItem('favoriteRecipes');
    }
  };

  return (
    <div>
      <CopyToClipboard
        text={ `http://localhost:3000${pathname}` }
        onCopy={ () => setCopied(true) }
      >
        <button
          type="button"
          data-testid="share-btn"
        >
          <img className="icon" src={ shareIcon } alt="share" />
        </button>
      </CopyToClipboard>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ isFavorite }
      >
        <img
          className="icon"
          src={ favorite ? blackHeartIcon : whiteHeartIcon }
          alt="favorite"
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
};

export default LikeAndShare;
