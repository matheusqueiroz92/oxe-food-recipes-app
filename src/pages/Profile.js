import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

const Profile = () => (
  <div>
    <SearchBar />
    <Header title="Profile" profile />
    <Footer />
  </div>
);

export default Profile;
