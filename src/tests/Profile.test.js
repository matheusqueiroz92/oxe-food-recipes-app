import React from 'react';
import { screen } from '@testing-library/react';
import Profile from '../pages/Profile';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';



describe('testando a pagina Profile', () => {
  test('testando os elementos da pagina', () => {
    renderWithRouter(<Profile />);

    const header = screen.getByRole('heading', {
      name: /profile/i
    })
    expect(header).toBeInTheDocument();

    const btnProfile = screen.getByRole('button', {
      name: /profile/i
    })
    expect(btnProfile).toBeInTheDocument();

    const btnDoneRecipes = screen.getByRole('button', {
      name: /done recipes/i
    })
    expect(btnDoneRecipes).toBeInTheDocument();

    const btnFavoriteRecipes = screen.getByRole('button', {
      name: /favorite recipes/i
    })
    expect(btnFavoriteRecipes).toBeInTheDocument();

    const btnLogout = screen.getByRole('button', {
      name: /favorite recipes/i
    })
    expect(btnLogout).toBeInTheDocument();

  });
  test('testando o botão Done Recipes', () => {
    const { history } = renderWithRouter(<Profile />);

    const btnDoneRecipes = screen.getByTestId("profile-done-btn")

    userEvent.click(btnDoneRecipes)

    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });

  test('testando o botão Favorite Recipes', () => {
    const { history } = renderWithRouter(<Profile />);
    const btnFavoriteRecipes = screen.getByTestId("profile-favorite-btn")

    userEvent.click(btnFavoriteRecipes)

    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });


  test('testando o botão Logout', () => {
    const { history } = renderWithRouter(<Profile />);
    const btnLogout = screen.getByTestId("profile-logout-btn")

    userEvent.click(btnLogout)

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});