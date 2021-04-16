import React from 'react';
import { AdDeck } from './AdDeck';
import data from '../mock-data';
import './App.css';
import { Header } from './Header';
import { Footer } from './Footer';

const App = () => {
  return (
    <>
      <Header />
      <AdDeck ads={data.ads} />
      <Footer />
    </>
  );
};

export default App;
