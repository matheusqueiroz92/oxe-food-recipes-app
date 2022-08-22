import React from 'react';

const Header = () => {
  const test = 'test';
  return (
    <div>
      <h1 data-testid="page-title">HEADER</h1>
      <i data-testid="profile-top-btn" />
      <i data-testid="search-top-btn" />
    </div>
  );
};

export default Header;
