import React from 'react';
import { AdDeck } from './AdDeck';
import data from '../mock-data';
import './App.css';

const App = () => {
  return (
    <>
      <AdDeck ads={data.ads} />
    </>
  )
}

export default App;
