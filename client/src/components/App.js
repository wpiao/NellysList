import React from 'react';
import { useGetAds } from '../hooks/useGetAds';
import { AdDeck } from './AdDeck';
// leave the mock data for now, will delete it right before deployment
// import data from '../mock-data';
import './App.css';

const App = () => {
  const ads = useGetAds();

  return (
    <>
      <AdDeck ads={ads} />
    </>
  )
}

export default App;
