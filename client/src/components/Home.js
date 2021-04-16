import React from 'react';
import { AdDeck } from './AdDeck';
import data from '../mock-data';
import { Header } from './Header';
import { Footer } from './Footer';

export const Home = () => {
  return (
    <>
      <Header />
      <AdDeck ads={data.ads} />
      <Footer />
    </>
  );
};
