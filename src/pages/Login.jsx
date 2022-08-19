import React from 'react';

function Login() {
  return (
    <div>
      <label htmlFor="email-input">
        Email
        <input id="email-input" data-testid="email-input" />
      </label>
      <label htmlFor="password-input">
        Password
        <input id="password-input" data-testid="password-input" />
      </label>
      <button type="button" data-testid="login-submit-btn">Enter</button>
    </div>
  );
}

// Entrei!

export default Login;
