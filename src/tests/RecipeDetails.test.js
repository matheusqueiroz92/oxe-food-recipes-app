import React from "react";
import { screen } from '@testing-library/react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from "./renderWithRouter";
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';

describe('Testes do componente RecipeDetails', () => {
  it('Testa os detalhes de alguma bebida', async () => {
    const { history } = renderWithRouter(<App/ >); 
    history.push('/foods');

    const mock = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(meals),
  }))

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    
    const foodCorba = screen.getByText(/corba/i);
    expect(foodCorba).toBeInTheDocument();
    userEvent.click(foodCorba);
    expect(history.location.pathname).toBe('/foods/52977');
    
    const titleCorba = screen.getByRole('heading', {  name: /corba/i});
    expect(titleCorba).toBeInTheDocument();
    
    const recomendations = screen.getByTestId("recomendations");
    expect 
    expect(recomendations.childNodes.length).toBe(1);
    
    const btnStartRecipe = screen.getByRole('button', {  name: /start recipe/i});
    expect(btnStartRecipe).toBeInTheDocument();
    
    const ingredient = screen.getByTestId('0-ingredient-name-and-measure');
    expect(ingredient).toBeInTheDocument();
    
    const recipeCategory = screen.getByTestId('recipe-category')
    expect(recipeCategory).toBeInTheDocument();
    
    const instructions = screen.getByText(/pick through your lentils for any foreign debris, rinse them 2 or 3 times, drain, and set aside\. fair warning, this will probably turn your lentils into a solid block that you’ll have to break up later in a large pot over medium\-high heat, sauté the olive oil and the onion with a pinch of salt for about 3 minutes, then add the carrots and cook for another 3 minutes\. add the tomato paste and stir it around for around 1 minute\. now add the cumin, paprika, mint, thyme, black pepper, and red pepper as quickly as you can and stir for 10 seconds to bloom the spices\. congratulate yourself on how amazing your house now smells\. immediately add the lentils, water, broth, and salt\. bring the soup to a \(gentle\) boil\. after it has come to a boil, reduce heat to medium\-low, cover the pot halfway, and cook for 15\-20 minutes or until the lentils have fallen apart and the carrots are completely cooked\. after the soup has cooked and the lentils are tender, blend the soup either in a blender or simply use a hand blender to reach the consistency you desire\. taste for seasoning and add more salt if necessary\. serve with crushed\-up crackers, torn up bread, or something else to add some extra thickness\. you could also use a traditional thickener \(like cornstarch or flour\), but i prefer to add crackers for some texture and saltiness\. makes great leftovers, stays good in the fridge for about a week\./i
    )
    expect(instructions).toBeInTheDocument();
  })
    mock.mockRestore()
    })

  it('Testa os detalhes de alguma bebida', async () => {
    const { history } = renderWithRouter(<App/ >); 
    history.push('/drinks');

    const mock = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(drinks),
  }))

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977');
    
    const drinkGG = screen.getByText(/gg/i)
    expect(drinkGG).toBeInTheDocument();
    userEvent.click(drinkGG);
    expect(history.location.pathname).toBe('drinks/15997');

    const titleCorba = screen.getByRole('heading', { name: /gg/i });
    expect(titleCorba).toBeInTheDocument();

    const recomendations = screen.getByTestId("recomendations");
    expect(recomendations.childNodes.length).toBe(1);

    const btnStartRecipe = screen.getByRole('button', { name: /start recipe/i });
    expect(btnStartRecipe).toBeInTheDocument();

    const ingredient = screen.getByTestId("ingredients");
    expect(ingredient).toBeInTheDocument();

    const imgFood = screen.getByTestId('recipe-photo');
    expect(imgFood).toBeInTheDocument();
    })
  })
})
