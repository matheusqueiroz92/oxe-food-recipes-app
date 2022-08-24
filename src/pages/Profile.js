import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const email = localStorage.getItem('user');

  const history = useHistory();

  function handleClick() {
    localStorage.clear();
    history.push('/');
  }
  return (
    <div>
      <Header title="Profile" profile />

      <div>
        <p data-testid="profile-email">{email}</p>

        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>

        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>

        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClick }
        >
          Logout
        </button>

      </div>

      <Footer />
    </div>
  );
}

export default Profile;
