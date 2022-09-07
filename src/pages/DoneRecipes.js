import React, { useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import copyThing from '../components/ClipBoardCopy';

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
  const [copied, setCopied] = useState(false);
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
    const clickCopy = (type, id) => {
      if (type === 'food') {
        copyThing(`http://localhost:3000/foods/${id}`);
      } else {
        copyThing(`http://localhost:3000/drinks/${id}`);
      }
      setCopied(true);
    };
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
        <button
          alt={ elem.name }
          type="button"
          src={ shareIcon }
          data-testid={ `${index}-horizontal-share-btn` }
          style={ { width: 70, height: 25 } }
          onClick={ () => clickCopy(elem.type, elem.id) }
        >
          Share

        </button>
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
      { copied ? <span>Link copied!</span> : null }
    </div>
  );
};

export default DoneRecipes;
