import React from "react";
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from "./renderWithRouter";

describe('Testes do componente RecipeDetails', () => {
  it('deve renderizar um cabeçalho contendo o titulo da receita', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52874');

    const foodHeader = await screen.findByText(/beef and mustard pie/i);
    expect(foodHeader).toBeInTheDocument();
  });
});
