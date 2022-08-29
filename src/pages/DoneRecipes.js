import React from 'react';
import Header from '../components/Header';

const DoneRecipes = () => (
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
  </div>
);
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
