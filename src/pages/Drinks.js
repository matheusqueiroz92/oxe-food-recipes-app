import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

function Drinks({ history }) {
  const { searchRecipes } = useContext(RecipesContext);
  const DOZE = 12;

  // useEffect(() => {
  //   if (searchRecipes.drinks.length < 1) {
  //     global.alert('Sorry, we haven\'t found any recipes for these filters.');
  //   }
  // }, []);

  return (
    <div>
      <div>
        <Header title="Drinks" profile search history={ history } />
      </div>
      <div><Footer /></div>
      { searchRecipes.drinks.length === 1
        ? history.push(`/drinks/${searchRecipes.drinks[0].idDrink}`)
        : (
          <div>
            { searchRecipes.drinks.length > 1 ? searchRecipes.drinks
              .map((recipe, index) => (
                <div
                  key={ `d ${index}` }
                  className="card-recipe"
                  data-testid={ `${index}-recipe-card` }
                >
                  <p
                    key={ `p ${index}` }
                    data-testid={ `${index}-card-name` }
                  >
                    {recipe.strDrink}
                  </p>
                  <img
                    key={ index }
                    src={ recipe.strDrinkThumb }
                    alt={ recipe.strDrink }
                    data-testid={ `${index}-card-img` }
                  />
                </div>
              )).filter((element, idx) => idx < DOZE)
              : <p /> }
          </div>) }
    </div>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Drinks;
