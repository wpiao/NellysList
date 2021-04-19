import React from 'react';
import { AdDeck } from './AdDeck';
import data from '../mock-data';
import { useGetAds } from '../hooks/useGetAds';

export const Home = () => {
  const ads = useGetAds();
  return <AdDeck ads={data.ads} />;
};
