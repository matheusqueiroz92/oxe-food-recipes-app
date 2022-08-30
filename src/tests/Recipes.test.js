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
        const cardBeef = screen.getByText(/beef and mustard pie/i);
        expect(cardBeef).toBeInTheDocument();
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

    it('Testando o botão de All', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/foods');

        const mock = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(meals),
        }))
        
        await waitFor(() => {
        const btnAll = screen.getByTestId('All-category-filter');
        expect(btnAll).toBeDefined();
        userEvent.click(btnAll);
        expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        expect(history.location.pathname).toBe('/foods');
        })

        mock.mockRestore()
    })  

    it('Testando o botão de categoria All', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/drinks');

        const mock = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(drinks),
        }))
        
        await waitFor(() => {
        const btnDrinks = screen.getByTestId('All-category-filter');
        expect(btnDrinks).toBeDefined();
        userEvent.click(btnDrinks);
        expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        expect(history.location.pathname).toBe('/drinks');
        })
        mock.mockRestore()
    })  

    it('Testando o botão de categoria Ordinary Drink', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/drinks');
        
        await waitFor(() => {
        const btnOrdinary = screen.getByTestId('Ordinary Drink-category-filter');
        expect(btnOrdinary).toBeDefined();
        userEvent.click(btnOrdinary);
        const cardOrdinary = screen.getByText(/3\-mile long island iced tea/i);
        expect(cardOrdinary).toBeInTheDocument();
        })
    }) 

    it('Teste de rota api de comidas', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/foods');

        const mock = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(meals),
        }))

        await waitFor(() => expect(global.fetch).toHaveBeenCalled());
        await waitFor(() => {
            const btnFood = screen.getByTestId('food-bottom-btn');
            userEvent.click(btnFood);
            expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
            expect(history.location.pathname).toBe('/foods');
        })

        mock.mockRestore()

    })

    it('Teste de rota api de bebidas', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/drinks');

        const mock = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(drinks),
        }))

        await waitFor(() => expect(global.fetch).toHaveBeenCalled());
        await waitFor(() => {
            const btnDrink = screen.getByTestId('drinks-bottom-btn');
            userEvent.click(btnDrink);
            expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
            expect(history.location.pathname).toBe('/drinks');
        })

        mock.mockRestore()  
    })
})