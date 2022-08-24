import React from "react";
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from "./renderWithRouter";

describe('Testes do componente Header', () => {
  it('deve redirecionar a página para /profile ao clicar no ícone de perfil', () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByRole('textbox', {  name: /email:/i});
    const passwordInput = screen.getByLabelText(/password:/i);
    const loginButton = screen.getByRole('button', { name: /enter/i });

    userEvent.type(emailInput, 'example@example.com');
    userEvent.type(passwordInput, '12312312');
    userEvent.click(loginButton);
    expect(history.location.pathname).toBe('/foods');

    const profileIcon = screen.getByRole('button', {  name: /profile/i});
    const searchIcon = screen.getByRole('button', {  name: /search/i});
    
    userEvent.click(searchIcon);
    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();

    userEvent.click(profileIcon);
    expect(history.location.pathname).toBe('/profile');
  });
});