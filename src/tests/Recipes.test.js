import React from "react";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from "./renderWithRouter";

import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';

describe('Testando o componente Recipes', () => {
    it('Testa se o usuário é redirecionado para a rota foods caso a receita seja comida', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/foods')

        const foodCorba = await screen.findByText('Corba');
        expect(foodCorba).toBeInTheDocument();

        const foodsCards = screen.getByTestId('cardsRecipes');
        expect(foodsCards.childNodes.length).toBe(12);

        userEvent.click(foodCorba);
        expect(history.location.pathname).toBe('/foods/52977');
    })

    it('Testa se o usuário é redirecionado para a rota drinks caso a receita seja bebida', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/drinks')

        const drinkGG = await screen.findByText('GG');
        expect(drinkGG).toBeInTheDocument();

        const foodsCards = screen.getByTestId('cardsRecipes');
        expect(foodsCards.childNodes.length).toBe(12);

        userEvent.click(drinkGG);
        expect(history.location.pathname).toBe('/drinks/15997');
    })

    it('Testando o botão de categoria Beef', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/foods');
        
        await waitFor(() => {
        const btnBeef = screen.getByTestId('Beef-category-filter');
        expect(btnBeef).toBeDefined();
        userEvent.click(btnBeef);
        })
    })  

    it('Testando o botão de categoria Breakfast', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/foods');
        
        await waitFor(() => {
        const btnBreakfast = screen.getByTestId('Breakfast-category-filter');
        expect(btnBreakfast).toBeDefined();
        userEvent.click(btnBreakfast);
        })
    })  

    it('Testando o botão de categoria Chicken', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/foods');
        
        await waitFor(() => {
        const btnChicken = screen.getByTestId('Chicken-category-filter');
        expect(btnChicken).toBeDefined();
        userEvent.click(btnChicken);
        })
    }) 

    it('Testando o botão de categoria Dessert', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/foods');
        
        await waitFor(() => {
        const btnDessert = screen.getByTestId('Dessert-category-filter');
        expect(btnDessert).toBeDefined();
        userEvent.click(btnDessert);
        })
    }) 

    it('Testando o botão de categoria Goat', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/foods');
        
        await waitFor(() => {
        const btnGoat = screen.getByTestId('Goat-category-filter');
        expect(btnGoat).toBeDefined();
        userEvent.click(btnGoat);
        })
    }) 

    it('Testando o botão de All', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/foods');
        
        await waitFor(() => {
        const btnAll = screen.getByTestId('All-category-filter');
        expect(btnAll).toBeDefined();
        userEvent.click(btnAll);
        })
    })  

    it('Testando o botão de categoria All', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/drinks');
        
        await waitFor(() => {
        const btnDrinks = screen.getByTestId('All-category-filter');
        expect(btnDrinks).toBeDefined();
        userEvent.click(btnDrinks);
        })
    })  

    it('Testando o botão de categoria Ordinary Drink', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/drinks');
        
        await waitFor(() => {
        const btnOrdinary = screen.getByTestId('Ordinary Drink-category-filter');
        expect(btnOrdinary).toBeDefined();
        userEvent.click(btnOrdinary);
        })
    }) 
    
    it('Testando o botão de categoria Cocktail', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/drinks');
        
        await waitFor(() => {
        const btnCocktail = screen.getByTestId('Cocktail-category-filter');
        expect(btnCocktail).toBeDefined();
        userEvent.click(btnCocktail);
        })
    }) 
        
    it('Testando o botão de categoria Shake', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/drinks');
        
        await waitFor(() => {
        const btnShake = screen.getByTestId('Shake-category-filter');
        expect(btnShake).toBeDefined();
        userEvent.click(btnShake);
        })
    })

    it('Testando o botão de categoria Other', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/drinks');
        
        await waitFor(() => {
        const btnOther = screen.getByTestId('Other/Unknown-category-filter');
        expect(btnOther).toBeDefined();
        userEvent.click(btnOther);
        })
    })

    it('Testando o botão de categoria Cocoa', async () => {
        
    })
})