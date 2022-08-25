import React from "react";
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from "./renderWithRouter";
import meals from '../../cypress/mocks/meals';

describe('Testando o componente SearchBar', () => {
    beforeEach(() => {
            jest.spyOn(global, 'fetch').mockResolvedValue({
                json: jest.fn().mockResolvedValue(meals),
            });
          });
    
    afterEach(() => jest.clearAllMocks());


    it('Renderizando os elementos', async() => {
        const { history } = renderWithRouter(<App />);
        
        const emailLogin = screen.getByRole("textbox", { name: /email:/i });
        const passwordLogin = screen.getByLabelText("Password:");
        const btnLogin = screen.getByRole("button", { name: /enter/i });

        expect(btnLogin).toBeDisabled();

        userEvent.type(emailLogin, 'trybe@trybe.com');
        userEvent.type(passwordLogin, '1234567');
        expect(btnLogin).not.toBeDisabled();

        userEvent.click(btnLogin);
        expect(history.location.pathname).toBe('/foods');

        const imgSearch = screen.getByTestId('search-top-btn');
        userEvent.click(imgSearch);
        const inputSearch = screen.getByTestId('search-input');
        expect(inputSearch).toBeInTheDocument();

        const selectIngredient = screen.getAllByRole("radio")[0];
        const selectName = screen.getAllByRole("radio")[1];
        const selectFirstLetter = screen.getAllByRole("radio")[2];
        const btnSearch = screen.getByTestId('exec-search-btn');

        expect(selectIngredient).toBeInTheDocument();
        expect(selectName).toBeInTheDocument();
        expect(selectFirstLetter).toBeInTheDocument();

        userEvent.type(inputSearch, 'Chicken');
        userEvent.click(selectIngredient);
        userEvent.click(btnSearch);
        
        await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken');
    })

        userEvent.type(inputSearch, 'Chicken');
        userEvent.click(selectName);
        userEvent.click(btnSearch);

        await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken');
    })
        userEvent.type(inputSearch, 'c');
        userEvent.click(selectFirstLetter);
        userEvent.click(btnSearch);

        await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken');
    })
    })
})