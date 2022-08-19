import React, { useState } from 'react';

function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isDisabled, setDisabled] = useState(true);

  const validateInputs = () => {
    const SIX = 6;
    const MENOS_UM = -1;
    if (userEmail.search(/\S+@\S+\.\S+/) !== MENOS_UM && userPassword.length >= SIX) {
      setDisabled(false);
    }
  };

  const handleEmail = ({ target: { value } }) => {
    setUserEmail(value);
  };

  const handlePassWord = ({ target: { value } }) => {
    setUserPassword(value);
    validateInputs();
  };

  return (
    <form>
      <label htmlFor="email-input">
        Email
        <input
          id="email-input"
          type="email"
          value={ userEmail }
          onChange={ handleEmail }
          data-testid="email-input"
        />
      </label>
      <label htmlFor="password-input">
        Password
        <input
          id="password-input"
          type="password"
          value={ userPassword }
          onChange={ handlePassWord }
          data-testid="password-input"
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ isDisabled }
      >
        Enter

      </button>
    </form>
  );
}

export default Login;
