import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

const Drinks = () => (
  <div>
    <SearchBar />
    <Header title="Drinks" profile search />
    <Footer />
  </div>
);

export default Drinks;
