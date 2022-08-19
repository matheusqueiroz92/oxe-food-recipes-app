import React from "react";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';


describe('Testando a pagina de Login', () => {
  test('Mostrar os elementos da pagina', () => {
    render(<App />);
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
    render(<App />);
    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const btnInput = screen.getByTestId("login-submit-btn");
    expect(btnInput).toBeDisabled();
    userEvent.type(emailInput, 'alguem@gmail.com');
    userEvent.type(passwordInput, '1234567')
    expect(btnInput).not.toBeDisabled();
  });
});