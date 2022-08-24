import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

const Header = ({ title, profile, search, history }) => {
  const [isToggle, setToggle] = useState(false);
  const redirectToProfile = () => {
    history.push('/profile');
  };
  return (
    <div>

      <h1 data-testid="page-title">{title}</h1>
      {
        profile && <input
          alt="profile"
          type="image"
          src={ ProfileIcon }
          data-testid="profile-top-btn"
          onClick={ redirectToProfile }
        />
      }
      { search && <input
        alt="search"
        type="image"
        src={ SearchIcon }
        data-testid="search-top-btn"
        onClick={ () => setToggle(!isToggle)}
      />}
      { isToggle && <SearchBar />}
    </div>

  );
};

Header.defaultProps = {
  profile: false,
  search: false,
};

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  profile: PropTypes.bool,
  search: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default Header;
