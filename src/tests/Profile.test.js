import React from 'react';
import { screen } from '@testing-library/react';
import Profile from '../pages/Profile';
import userEvent from '@testing-library/user-event';
import RecipesProvider from '../context/RecipesProvider';
import renderWithRouter from './renderWithRouter';



describe('testando a pagina Profile', () => {
  test('testando os elementos da pagina', () => {
    renderWithRouter(<RecipesProvider><Profile /></RecipesProvider>);
    
    const header = screen.getByRole('heading', {
      name: /profile/i
    })

    expect(header).toBeInTheDocument();

  });

});