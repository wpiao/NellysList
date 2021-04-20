import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AdDeck } from './AdDeck';
import { CreateAdFormWrapper } from './CreateAdFormWrapper';
import { useGetAds } from '../hooks/useGetAds';
import SpinnerWrapper from './SpinnerWrapper';

export const Home = () => {
  const { ads, setAds, isLoading } = useGetAds();

  const handleUpdateAds = (res) => {
    setAds(res);
  };

  return isLoading ? (
    <SpinnerWrapper isLoading={isLoading} />
  ) : (
    <Switch>
      <Route path="/" exact children={<AdDeck ads={ads} />} />
      <Route
        path="/ads/create"
        children={<CreateAdFormWrapper updateAds={handleUpdateAds} />}
      />
    </Switch>
  );
};
