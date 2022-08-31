import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import meals from '../../cypress/mocks/meals';

describe('testando a pagina de receitas em progresso', () => {
  test('testando os elementos da pagina', async () => {
    const { history } = renderWithRouter(<App />)
    history.push('/foods/52977/in-progress')

    const mock = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(meals),
  }))
    
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977');
    })

    const titulo = screen.getByTestId('recipe-title')
    expect(titulo).toBeInTheDocument();

    const foto = screen.getByTestId('recipe-photo')
    expect(foto).toBeInTheDocument();

    const categoria = screen.getByRole('heading', {
      name: /side/i
    })
    expect(categoria).toBeInTheDocument();
    const ingredient1 = screen.getByRole('checkbox', {
    name: /lentils \- 1 cup/i
    })
    expect(ingredient1).toBeInTheDocument();
    const instrucoes = screen.getByText(/pick through your lentils for any foreign debris, rinse them 2 or 3 times, drain, and set aside\. fair warning, this will probably turn your lentils into a solid block that you’ll have to break up later in a large pot over medium\-high heat, sauté the olive oil and the onion with a pinch of salt for about 3 minutes, then add the carrots and cook for another 3 minutes\. add the tomato paste and stir it around for around 1 minute\. now add the cumin, paprika, mint, thyme, black pepper, and red pepper as quickly as you can and stir for 10 seconds to bloom the spices\. congratulate yourself on how amazing your house now smells\. immediately add the lentils, water, broth, and salt\. bring the soup to a \(gentle\) boil\. after it has come to a boil, reduce heat to medium\-low, cover the pot halfway, and cook for 15\-20 minutes or until the lentils have fallen apart and the carrots are completely cooked\. after the soup has cooked and the lentils are tender, blend the soup either in a blender or simply use a hand blender to reach the consistency you desire\. taste for seasoning and add more salt if necessary\. serve with crushed\-up crackers, torn up bread, or something else to add some extra thickness\. you could also use a traditional thickener \(like cornstarch or flour\), but i prefer to add crackers for some texture and saltiness\. makes great leftovers, stays good in the fridge for about a week\./i
    )
    expect(instrucoes).toBeInTheDocument();
    
    const btn = screen.getByRole('button', { name: /finish recipe/i })
    expect(btn).toBeInTheDocument();
    mock.mockRestore()
  });

});
