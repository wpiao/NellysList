import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AdDeck } from './AdDeck';
import { useGetAds } from '../hooks/useGetAds';

export const Home = () => {
  const ads = useGetAds();
  return (
    <Router>
      <>
        <Switch>
          <Route
            path='/'
            children={
              <AdDeck ads={ads} />
            }
          />
        </Switch>
      </>
    </Router>
  );
};
