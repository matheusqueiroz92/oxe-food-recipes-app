import PropTypes from 'prop-types';
import React from 'react';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

const Header = ({ title, profile, search }) => (
  <div>
    <h1 data-testid="page-title">{title}</h1>
    { profile && <img
      alt="profile-pic"
      src={ ProfileIcon }
      data-testid="profile-top-btn"
    />}
    { search && <img
      alt="search-pic"
      src={ SearchIcon }
      data-testid="search-top-btn"
    />}
  </div>
);

Header.defaultProps = {
  profile: false,
  search: false,
};

Header.propTypes = {
  profile: PropTypes.bool,
  search: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default Header;
