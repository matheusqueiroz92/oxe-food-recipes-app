import PropTypes from 'prop-types';
import React from 'react';

const Header = ({ title }) => (
  <div>
    <h1 data-testid="page-title">{title}</h1>
    <img
      alt="profile-pic"
      src="src/images/profileIcon.svg"
      data-testid="profile-top-btn"
    />
    <i data-testid="search-top-btn" />
  </div>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
