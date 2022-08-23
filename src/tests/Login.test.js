import React from "react";
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from "./renderWithRouter";


describe('Testando a pagina de Login', () => {
  test('Mostrar os elementos da pagina', () => {
    renderWithRouter(<App />);
    const email = screen.getByText(/email:/i);
    expect(email).toBeInTheDocument();
    const senha = screen.getByText(/password:/i);
    expect(senha).toBeInTheDocument();
    const btn = screen.getByRole('button', {
      name: /enter/i
    })
    expect(btn).toBeInTheDocument();

  });
  test('testa se o botão funciona', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const btnInput = screen.getByTestId("login-submit-btn");
    expect(btnInput).toBeDisabled();
    userEvent.type(emailInput, 'alguem@gmail.com');
    userEvent.type(passwordInput, '1234567')
    expect(btnInput).not.toBeDisabled();
  });
  test('testando as rotas', () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const btnInput = screen.getByTestId("login-submit-btn");
    userEvent.type(emailInput, 'alguem@gmail.com');
    userEvent.type(passwordInput, '1234567')
    userEvent.click(btnInput)
    const { pathname } = history.location
    expect(pathname).toBe('/foods');
  });
  test('testando a pagina Foods', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods')
    const foods = screen.getByText(/foods/i);
    expect(foods).toBeInTheDocument();
  });
}); 
