import React from "react";
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../components/Footer';
import renderWithRouter from "./renderWithRouter";

describe('testando o componente footer', () => {
  test('testando os ids da pagina', () => {
    renderWithRouter(<Footer/>)

    const drinksid = screen.getByTestId("drinks-bottom-btn")
    expect(drinksid).toBeInTheDocument();

    const foodsid = screen.getByTestId("food-bottom-btn")
    expect(foodsid).toBeInTheDocument();
  
  });

  test('testando se as imagens estão corretas', () => {
    renderWithRouter(<Footer />)

    const drinksImg = screen.getByRole('img', {
      name: /drinks/i
    })
    expect(drinksImg).toBeInTheDocument();

    const foodsImg = screen.getByRole('img', {
      name: /drinks/i
    })
    expect(foodsImg).toBeInTheDocument();
  });

  test('testando a rota foods', () => {
    const { history } = renderWithRouter(<Footer />)
    
    const foodsid = screen.getByTestId("food-bottom-btn")

    userEvent.click(foodsid)
    
    const {pathname} = history.location
    expect(pathname).toBe('/foods');
  });
  
  test('testando a rota drinks', () => {
    const {history} = renderWithRouter(<Footer/>)

    const drinksid = screen.getByTestId("drinks-bottom-btn")

    userEvent.click(drinksid)

    const { pathname } = history.location
    expect(pathname).toBe('/drinks');
  });
});