import React from "react";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from "./renderWithRouter";
import chickenMeals from '../../cypress/mocks/chickenMeals';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';

describe('Testando o componente Recipes', () => {
    it('Testa se muda para a rota /foods', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/');
        
        const emailLogin = screen.getByRole("textbox", { name: /email:/i });
        const passwordLogin = screen.getByLabelText("Password:");
        const btnLogin = screen.getByRole("button", { name: /enter/i });

        expect(btnLogin).toBeDisabled();

        userEvent.type(emailLogin, 'trybe@trybe.com');
        userEvent.type(passwordLogin, '1234567');
        expect(btnLogin).not.toBeDisabled();

        userEvent.click(btnLogin);
        expect(history.location.pathname).toBe('/foods');
    })

    it('Testa se ao selecionar o radio Ingrediente, a busca na API é feita corretamente na página de comidas', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/foods');

        const mock = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(chickenMeals),
        }))
        
        const imgSearch = screen.getByTestId('search-top-btn');
        userEvent.click(imgSearch);

        const inputSearch = screen.getByTestId('search-input');
        expect(inputSearch).toBeInTheDocument();

        const btnSearch = screen.getByTestId('exec-search-btn');
        const selectIngredient = screen.getAllByRole("radio")[0];
        expect(btnSearch).toBeInTheDocument();
        expect(selectIngredient).toBeInTheDocument();

        userEvent.type(inputSearch, 'Chicken');
        userEvent.click(selectIngredient);
        userEvent.click(btnSearch);

        expect(history.location.pathname).toBe('/foods');
        await waitFor(() => expect(global.fetch).toHaveBeenCalled());
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken');
        })
        mock.mockRestore()
    });

    it('Testa se ao selecionar o radio Nome, a busca na API é feita corretamente na página de comidas', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/foods')

        const mock = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(meals),
        }))

        const imgSearch = screen.getByTestId('search-top-btn');
        userEvent.click(imgSearch);

        const inputSearch = screen.getByTestId('search-input');
        expect(inputSearch).toBeInTheDocument();

        const btnSearch = screen.getByTestId('exec-search-btn');
        const selectName = screen.getAllByRole("radio")[1];
        expect(btnSearch).toBeInTheDocument();
        expect(selectName).toBeInTheDocument();

        userEvent.type(inputSearch, 'Chicken');
        userEvent.click(selectName);
        userEvent.click(btnSearch);

        expect(history.location.pathname).toBe('/foods');
        await waitFor(() => expect(global.fetch).toHaveBeenCalled());
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Chicken');
        })
        mock.mockRestore()
    });

    it('Testa se ao selecionar o radio Primeira Letra, a busca na API é feita corretamente na página de comidas', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/foods')

        const mock = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(meals),
        }))

        const imgSearch = screen.getByTestId('search-top-btn');
        userEvent.click(imgSearch);

        const inputSearch = screen.getByTestId('search-input');
        expect(inputSearch).toBeInTheDocument();

        const btnSearch = screen.getByTestId('exec-search-btn');
        const selectFirstLetter = screen.getAllByRole("radio")[2];
        expect(btnSearch).toBeInTheDocument();
        expect(selectFirstLetter).toBeInTheDocument();

        userEvent.type(inputSearch, 'C');
        userEvent.click(selectFirstLetter);
        userEvent.click(btnSearch);

        expect(history.location.pathname).toBe('/foods');
        await waitFor(() => expect(global.fetch).toHaveBeenCalled());
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=C');
        })
        mock.mockRestore()
    });

    it('Testa se ao selecionar o radio Ingrediente, a busca na API é feita corretamente na página de bebidas', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/drinks');

        const mock = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(drinks),
        }))
        
        const imgSearch = screen.getByTestId('search-top-btn');
        userEvent.click(imgSearch);

        const inputSearch = screen.getByTestId('search-input');
        expect(inputSearch).toBeInTheDocument();

        const btnSearch = screen.getByTestId('exec-search-btn');
        const selectIngredient = screen.getAllByRole("radio")[0];
        expect(btnSearch).toBeInTheDocument();
        expect(selectIngredient).toBeInTheDocument();

        userEvent.type(inputSearch, 'Gin');
        userEvent.click(selectIngredient);
        userEvent.click(btnSearch);

        expect(history.location.pathname).toBe('/drinks');
        await waitFor(() => expect(global.fetch).toHaveBeenCalled());
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin');
        })
        mock.mockRestore()
    });

    it('Testa se ao selecionar o radio Nome, a busca na API é feita corretamente na página de bebidas', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/drinks')

        const mock = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(drinks),
        }))

        const imgSearch = screen.getByTestId('search-top-btn');
        userEvent.click(imgSearch);

        const inputSearch = screen.getByTestId('search-input');
        expect(inputSearch).toBeInTheDocument();

        const btnSearch = screen.getByTestId('exec-search-btn');
        const selectIngredient = screen.getAllByRole("radio")[0];
        expect(btnSearch).toBeInTheDocument();
        expect(selectIngredient).toBeInTheDocument();

        userEvent.type(inputSearch, 'Gin');
        userEvent.click(selectIngredient);
        userEvent.click(btnSearch);

        expect(history.location.pathname).toBe('/drinks');
        await waitFor(() => expect(global.fetch).toHaveBeenCalled());
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin');
        })
        mock.mockRestore()
    });

    it('Testa se ao selecionar o radio Primeira Letra, a busca na API é feita corretamente na página de bebidas', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/drinks')

        const mock = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(drinks),
        }))

        const imgSearch = screen.getByTestId('search-top-btn');
        userEvent.click(imgSearch);

        const inputSearch = screen.getByTestId('search-input');
        expect(inputSearch).toBeInTheDocument();

        const btnSearch = screen.getByTestId('exec-search-btn');
        const selectName = screen.getAllByRole("radio")[1];
        expect(btnSearch).toBeInTheDocument();
        expect(selectName).toBeInTheDocument();

        userEvent.type(inputSearch, 'G');
        userEvent.click(selectName);
        userEvent.click(btnSearch);

        expect(history.location.pathname).toBe('/drinks');
        await waitFor(() => expect(global.fetch).toHaveBeenCalled());
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=G');
        })
        mock.mockRestore()
    });
})