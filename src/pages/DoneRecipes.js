import React from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

// const toGo = [{
//   id: 17203,
//   type: 'drink',
//   nationality: '',
//   category: 'Ordinary Drink',
//   alcoholicOrNot: 'Alcoholic',
//   name: 'Kir',
//   image: 'https://www.thecocktaildb.com/images/media/drink/apneom1504370294.jpg',
//   doneDate: '23/06/2020',
//   tags: ['IBA', 'ContemporaryClassic'],
// },
// {
//   id: '52771',
//   type: 'food',
//   nationality: 'Italian',
//   category: 'Vegetarian',
//   alcoholicOrNot: '',
//   name: 'Spicy Arrabiata Penne',
//   image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
//   doneDate: '23/06/2020',
//   tags: ['Pasta', 'Curry'],
// }];

// localStorage.setItem('doneRecipes', JSON.stringify(toGo));

const DoneRecipes = () => {
  const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const renderCategoryOrAlcoholic = (isFood, index, elem) => {
    if (isFood) {
      return (
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          { `${elem.nationality} - ${elem.category}` }
        </p>);
    } return (
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        { elem.alcoholicOrNot }
      </p>);
  };
  const renderDoneRecipes = getDoneRecipes.map((elem, index) => {
    const isFood = elem.type === 'food';
    return (
      <div key={ index }>
        <img
          alt={ elem.name }
          src={ elem.image }
          data-testid={ `${index}-horizontal-image` }
        />
        { renderCategoryOrAlcoholic(isFood, index, elem) }
        <p data-testid={ `${index}-horizontal-name` }>{ elem.name }</p>
        <p data-testid={ `${index}-horizontal-done-date` }>{ elem.doneDate }</p>
        <img
          alt={ elem.name }
          src={ shareIcon }
          data-testid={ `${index}-horizontal-share-btn` }
          style={ { width: 20, height: 20 } }
        />
        { elem
          .tags
          .map((
            tag,
            i,
          ) => (
            <p
              key={ i }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              { tag }
            </p>)) }
      </div>
    );
  });
  return (
    <div>
      <div>
        <Header title="Done Recipes" profile />
      </div>
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      { renderDoneRecipes }
    </div>
  );
};
/*  <=====Função de copiar o link de compartilhamento ====>
        function shareRecipesClick() {
        const copyText = document.getElementById('link-copy');
        copyText.select();
        copyText.setSelectionRange(0, Number('99999'));
        navigator.clipboard.writeText(copyText.value);
        }

      <section>
        <img src="" alt="" data-testid={ `${index}-horizontal-image` } />

        <h6 data-testid={ `${index}-horizontal-top-text` }> categoria da receita</h6>

        <h3 data-testid={ `${index}-horizontal-name` }> nome da receita </h3>

        <h6 data-testid={ `${index}-horizontal-done-date` }> data da receita </h6>

        <input type="text" value="http://localhost:3000/done-recipes" id="link-copy" />

        <button
          type="button"
          data-testid={ `${index}-horizontal-share-btn` }
          onClick={ shareRecipesClick }
        >
          <img
            src={ shareIcon }
            alt="share icon"
            data-testid={ `${index}-horizontal-image` }
          />
        </button>

        <p data-testid={ `${index}-${tagName}-horizontal-tag` }> tag Name </p>
      </section>
*/

export default DoneRecipes;
