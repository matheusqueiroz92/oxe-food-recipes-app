import React from "react";
import { screen } from '@testing-library/react';
import App from "../App";
import renderWithRouter from "./renderWithRouter";

describe('Testes da pagina de receitas feitas', () => {
const toGo = [{
  id: 17203,
  type: 'drink',
  nationality: '',
  category: 'Ordinary Drink',
  alcoholicOrNot: 'Alcoholic',
  name: 'Kir',
  image: 'https://www.thecocktaildb.com/images/media/drink/apneom1504370294.jpg',
  doneDate: '23/06/2020',
  tags: ['IBA', 'ContemporaryClassic'],
},
{
  id: '52771',
  type: 'food',
  nationality: 'Italian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: 'Spicy Arrabiata Penne',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  doneDate: '23/06/2020',
  tags: ['Pasta', 'Curry'],
}];

localStorage.setItem('doneRecipes', JSON.stringify(toGo));

  it('deve renderizar uma receita de bebida concluída', () => {
    const { history } = renderWithRouter(<App/ >);
    history.push('/done-recipes');

    const drink = screen.getByText(/alcoholic/i);
    expect(drink).toBeInTheDocument();
  });

  it('deve renderizar uma receita de comida concluída', () => {
    const { history } = renderWithRouter(<App/ >);
    history.push('/done-recipes');

    const foodCategory = screen.getByText(/italian \- vegetarian/i);
    expect(foodCategory).toBeInTheDocument();
  });
});
