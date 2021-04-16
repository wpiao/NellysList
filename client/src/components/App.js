import React, { useState, useEffect } from 'react';
import { AdDeck } from './AdDeck';
// leave the mock data for now, will delete it right before deployment
// import data from '../mock-data';
import { getAds } from '../api/apiUtils';
import './App.css';

const App = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    getAds(setAds);
  }, [])

  return (
    <>
      <AdDeck ads={ads} />
    </>
  )
}

export default App;
