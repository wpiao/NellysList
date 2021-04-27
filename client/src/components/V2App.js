import React from 'react';
import { Header } from './Header';
import { V2Home } from './V2Home';
import { Footer } from './Footer';
import { AdsProvider } from '../contexts/AdsContext';

const V2App = () => {
  return (
    <>
      <Header />
      <AdsProvider>
        <V2Home />
      </AdsProvider>
      <Footer />
    </>
  );
};

export default V2App;
