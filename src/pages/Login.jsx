import React, { useState, useEffect } from 'react';
import './login.css';
import PropTypes from 'prop-types';

function Login({ history }) {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const [toogleButton, setToogleButton] = useState(true);

  useEffect(() => {
    const validateInputs = () => {
      const { email, password } = login;
      const SEVEN = 7;
      const MENOS_UM = -1;
      if ((email.search(/\S+@\S+\.\S+/) !== MENOS_UM) && password.length >= SEVEN) {
        setToogleButton(false);
      } else {
        setToogleButton(true);
      }
    };
    validateInputs();
  }, [login]);

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
      <h1>LOGIN</h1>
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
          name="buttonLogin"
          data-testid="login-submit-btn"
          disabled={ toogleButton }
          onClick={ handleClick }
        >
          Enter

        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
