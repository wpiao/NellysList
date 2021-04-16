import React from 'react';
import { AdDeck } from './AdDeck';
import data from '../mock-data';

export const Home = () => {
  return <AdDeck ads={data.ads} />;
};
