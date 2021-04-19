import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AdDeck } from './AdDeck';
import { CreateAdForm } from './CreateAdForm';
import { useGetAds } from '../hooks/useGetAds';

export const Home = () => {
  const ads = useGetAds();
  return (
    <Router>
      <Switch>
        <Route
          path="/" exact
          children={<AdDeck ads={ads} />}
        />
        <Route
          path="/ads/create"
          children={<CreateAdForm />}
        />
      </Switch>
    </Router>
  );
};
