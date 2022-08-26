import React from "react";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from "./renderWithRouter";
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';

describe('Testando o componente SearchBar', () => {
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

    it('Testa se acha a comida pelo nome do ingrediente', async () => {
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
        const selectIngredient = screen.getAllByRole("radio")[0];
        expect(btnSearch).toBeInTheDocument();
        expect(selectIngredient).toBeInTheDocument();
        
        userEvent.type(inputSearch, 'Tomato');
        userEvent.click(selectIngredient);
        userEvent.click(btnSearch);

        await waitFor(() => expect(global.fetch).toHaveBeenCalled());
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Tomato');
        })

        mock.mockRestore()
    })

    it('Testa se acha a comida pelo nome do prato', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/foods')

        const mock = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(meals),
        }))
        
        const imgSearch = screen.getByTestId('search-top-btn')
        userEvent.click(imgSearch);

        const inputSearch = screen.getByTestId('search-input');
        expect(inputSearch).toBeInTheDocument();
        
        const btnSearch = screen.getByTestId('exec-search-btn');
        const selectName = screen.getAllByRole("radio")[1];
        expect(btnSearch).toBeInTheDocument();
        expect(selectName).toBeInTheDocument();
        
        userEvent.type(inputSearch, 'Tomato');
        userEvent.click(selectName);
        userEvent.click(btnSearch);

        await waitFor(() => expect(global.fetch).toHaveBeenCalled());
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Tomato')
        })

        mock.mockRestore()
    })

    it('Testa se acha a comida pela primeira letra', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/foods')

        const mock = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(meals),
        }))

        const imgSearch = screen.getByTestId('search-top-btn')
        userEvent.click(imgSearch);

        const inputSearch = screen.getByTestId('search-input');
        expect(inputSearch).toBeInTheDocument();

        const btnSearch = screen.getByTestId('exec-search-btn');
        const selectFirstLetter = screen.getAllByRole("radio")[2];
        expect(btnSearch).toBeInTheDocument();
        expect(selectFirstLetter).toBeInTheDocument();

        userEvent.type(inputSearch, 'c');
        userEvent.click(selectFirstLetter);
        userEvent.click(btnSearch);

        await waitFor(() => expect(global.fetch).toHaveBeenCalled());
        await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=c');
        })

        mock.mockRestore()
    })

    it('Testa o alarme de um caracter', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/foods');

        global.alert = jest.fn();

        const imgSearch = screen.getByTestId('search-top-btn')
        userEvent.click(imgSearch);

        const inputSearch = screen.getByTestId('search-input');
        expect(inputSearch).toBeInTheDocument();

        const btnSearch = screen.getByTestId('exec-search-btn');
        const selectFirstLetter = screen.getAllByRole("radio")[2];
        expect(btnSearch).toBeInTheDocument();
        expect(selectFirstLetter).toBeInTheDocument();
    
        userEvent.type(inputSearch, 'cc');
        userEvent.click(selectFirstLetter);
        userEvent.click(btnSearch);

        await waitFor(() => {
        expect(global.alert).toBeCalledWith("Your search must have only 1 (one) character");
        })
    })

    it('Testando o alert de not found', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/foods');

        global.alert = jest.fn();

        const iconSearch = screen.getByTestId('search-top-btn');

        userEvent.click(iconSearch);

        const inputSearch = screen.getByTestId('search-input');      
        const btnSearch = screen.getByTestId('exec-search-btn');
        const selectName = screen.getAllByRole("radio")[1];

        userEvent.type(inputSearch, 'Xablau');
        userEvent.click(selectName);
        userEvent.click(btnSearch);

        await waitFor(() => {
        expect(global.alert).toBeCalledWith('Sorry, we haven\'t found any recipes for these filters.');
        })
    })

    it('Testa se acha a bebida pelo nome do ingrediente', async () => {
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
        
        userEvent.type(inputSearch, 'strawberry');
        userEvent.click(selectIngredient);
        userEvent.click(btnSearch);

        await waitFor(() => expect(global.fetch).toHaveBeenCalled());
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=strawberry');
        })

        mock.mockRestore()
    })

    it('Testa se acha a bebida pelo nome do drink', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/drinks')

        const mock = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(meals),
        }))
        
        const imgSearch = screen.getByTestId('search-top-btn')
        userEvent.click(imgSearch);

        const inputSearch = screen.getByTestId('search-input');
        expect(inputSearch).toBeInTheDocument();
        
        const btnSearch = screen.getByTestId('exec-search-btn');
        const selectName = screen.getAllByRole("radio")[1];
        expect(btnSearch).toBeInTheDocument();
        expect(selectName).toBeInTheDocument();
        
        userEvent.type(inputSearch, 'strawberry');
        userEvent.click(selectName);
        userEvent.click(btnSearch);

        await waitFor(() => expect(global.fetch).toHaveBeenCalled());
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=strawberry')
        })

        mock.mockRestore()
    })

    it('Testa se acha a bebida pela primeira letra', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/drinks')

        const mock = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(meals),
        }))

        const imgSearch = screen.getByTestId('search-top-btn')
        userEvent.click(imgSearch);

        const inputSearch = screen.getByTestId('search-input');
        expect(inputSearch).toBeInTheDocument();

        const btnSearch = screen.getByTestId('exec-search-btn');
        const selectFirstLetter = screen.getAllByRole("radio")[2];
        expect(btnSearch).toBeInTheDocument();
        expect(selectFirstLetter).toBeInTheDocument();

        userEvent.type(inputSearch, 's');
        userEvent.click(selectFirstLetter);
        userEvent.click(btnSearch);

        await waitFor(() => expect(global.fetch).toHaveBeenCalled());
        await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=s');
        })

        mock.mockRestore()
    })
})

