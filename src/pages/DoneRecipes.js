import React from 'react';
import Header from '../components/Header';

// const toGo = [{
//   id: 17203,
//   type: 'bebida',
//   nationality: '',
//   category: 'Ordinary Drink',
//   alcoholicOrNot: 'Alcoholic',
//   name: 'Kir',
//   image: 'https://www.thecocktaildb.com/images/media/drink/apneom1504370294.jpg',
//   doneDate: '23/06/2020',
//   tags: ['IBA', 'ContemporaryClassic'],
// }];

// localStorage.setItem('doneRecipes', JSON.stringify(toGo));

const DoneRecipes = () => {
  const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const renderDoneRecipes = getDoneRecipes.map((elem, index) => (
    <div key={ index }>
      <img
        alt={ elem.name }
        src={ elem.image }
        data-testid={ `${index}-horizontal-image` }
      />
      <p data-testid={ `${index}-horizontal-top-text` }>{ elem.category }</p>
      <p data-testid={ `${index}-horizontal-name` }>{ elem.name }</p>
      <p data-testid={ `${index}-horizontal-done-date` }>{ elem.doneDate }</p>
      <p data-testid={ `${index}-horizontal-share-btn` }>Test</p>
      { elem
        .tags
        .map((
          tag,
        ) => (
          <p
            key={ index }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            { tag }
          </p>)) }
    </div>
  ));
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
