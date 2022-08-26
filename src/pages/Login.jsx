import React, { useContext } from 'react';
import './login.css';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

function Login({ history }) {
  const { login, setLogin, toogleButton } = useContext(RecipesContext);

  const handleLogin = ({ target }) => {
    const { name, value } = target;
    setLogin((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  };

  const handleClick = () => {
    const { email } = login;
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    history.push('/foods');
  };

  const { email, password } = login;

  return (
    <div className="form-login">
      <div className="container">
        <h1 className="title-login">LOGIN</h1>
        <form>
          <label htmlFor="email-input">
            Email:
            <input
              className="input-login"
              id="email-input"
              type="email"
              name="email"
              value={ email }
              onChange={ handleLogin }
              data-testid="email-input"
            />
          </label>
          <label htmlFor="password-input">
            Password:
            <input
              className="input-login"
              id="password-input"
              type="password"
              name="password"
              value={ password }
              onChange={ handleLogin }
              data-testid="password-input"
            />
          </label>
          <button
            className="button-login"
            type="button"
            id="buttonLogin"
            data-testid="login-submit-btn"
            disabled={ toogleButton }
            onClick={ handleClick }
          >
            Enter

          </button>
        </form>
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
