import React from 'react';
import { useHistory } from 'react-router';
import DrinkIcon from '../images/drinkIcon.svg';
import MealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  const history = useHistory();

  return (
    <footer className="footer" data-testid="footer">
      <button
        className="btn"
        type="button"
        onClick={ () => history.push('/drinks') }
      >
        <img data-testid="drinks-bottom-btn" src={ DrinkIcon } alt="drinks" />
      </button>
      <button
        className="btn"
        type="button"
        onClick={ () => history.push('/foods') }
      >
        <img data-testid="food-bottom-btn" src={ MealIcon } alt="foods" />
      </button>
    </footer>
  );
}

export default Footer;
