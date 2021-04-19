import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AdDeck } from './AdDeck';
import { CreateAdFormWrapper } from './CreateAdFormWrapper';
import { useGetAds } from '../hooks/useGetAds';

export const Home = () => {
  const ads = useGetAds();
  return (
    <Switch>
      <Route
        path="/" exact
        children={<AdDeck ads={ads} />}
      />
      <Route
        path="/ads/create"
        children={<CreateAdFormWrapper />}
      />
    </Switch>
  );
};
