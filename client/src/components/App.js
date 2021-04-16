import React, { useState, useEffect } from 'react';
import { AdDeck } from './AdDeck';
// import data from '../mock-data';
import { getAds } from '../api/apiUtils';
import './App.css';

const App = () => {
  const [ads, setAds] = useState([]);

  console.log(getAds);

  useEffect(() => {
    console.log('getAds called');
    getAds(setAds);
  }, [])

  return (
    <>
      <AdDeck ads={ads} />
    </>
  )
}

export default App;
