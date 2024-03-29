import React from "react";
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from "./renderWithRouter";
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';

describe('Testes do componente RecipeDetails', () => {
  it('Testa os detalhes de alguma bebida', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const foodCorba = await screen.findByText(/corba/i);
    userEvent.click(foodCorba);
    expect(history.location.pathname).toBe('/foods/52977');

    const titleCorba = await screen.findByRole('heading', { name: /corba/i });
    expect(titleCorba).toBeInTheDocument();

    const recomendations = await screen.findByTestId('0-recomendation-title')
    expect(recomendations).toBeVisible();
    console.log(recomendations);
    userEvent.click(recomendations)

    const btnStartRecipe = await screen.findByRole('button', { name: /start recipe/i });
    expect(btnStartRecipe).toBeInTheDocument();

    const ingredient = await screen.findByTestId('0-ingredient-name-and-measure');
    expect(ingredient).toBeInTheDocument();

    const recipeCategory = await screen.findByTestId('recipe-category')
    expect(recipeCategory).toBeInTheDocument();

    const instructions = await screen.findByText(/pick through your lentils for any foreign debris, rinse them 2 or 3 times, drain, and set aside\. fair warning, this will probably turn your lentils into a solid block that you’ll have to break up later in a large pot over medium\-high heat, sauté the olive oil and the onion with a pinch of salt for about 3 minutes, then add the carrots and cook for another 3 minutes\. add the tomato paste and stir it around for around 1 minute\. now add the cumin, paprika, mint, thyme, black pepper, and red pepper as quickly as you can and stir for 10 seconds to bloom the spices\. congratulate yourself on how amazing your house now smells\. immediately add the lentils, water, broth, and salt\. bring the soup to a \(gentle\) boil\. after it has come to a boil, reduce heat to medium\-low, cover the pot halfway, and cook for 15\-20 minutes or until the lentils have fallen apart and the carrots are completely cooked\. after the soup has cooked and the lentils are tender, blend the soup either in a blender or simply use a hand blender to reach the consistency you desire\. taste for seasoning and add more salt if necessary\. serve with crushed\-up crackers, torn up bread, or something else to add some extra thickness\. you could also use a traditional thickener \(like cornstarch or flour\), but i prefer to add crackers for some texture and saltiness\. makes great leftovers, stays good in the fridge for about a week\./i
    )
    expect(instructions).toBeInTheDocument();
  })
})

it('Testa os detalhes de alguma bebida', async () => {
  const { history } = renderWithRouter(<App />);
  history.push('/drinks');

})

it('deve renderizar igredientes', async () => {
  const { history } = renderWithRouter(<App />);
  history.push('/foods/52947');

  const beef = await screen.findByText(/450g tofu/i);
  expect(beef).toBeInTheDocument();
});
