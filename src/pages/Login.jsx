import React, { useState } from 'react';
import './login.css';

function Login() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
    buttonLogin: true,
  });

  // const 111
  // const [userPassword, setUserPassword] = useState('');
  // const [isDisabled, setDisabled] = useState(true);

  const validateInputs = () => {
    const { email, password } = login;
    const SIX = 6;
    const MENOS_UM = -1;
    if ((email.search(/\S+@\S+\.\S+/) !== MENOS_UM) && password.length >= SIX) {
      setLogin((prevLogin) => ({
        ...prevLogin,
        buttonLogin: false,
      }));
    }
  };

  const handleLogin = ({ target }) => {
    const { name, value } = target;
    setLogin((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
    validateInputs();
  };

  // const handlePassWord = ({ target: { value } }) => {
  //   setUserPassword(value);
  //   validateInputs();
  // };

  const { email, password, buttonLogin } = login;

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
          disabled={ buttonLogin }
        >
          Enter

        </button>
      </form>
    </div>
  );
}

export default Login;
