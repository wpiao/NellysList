import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AdsPage } from './AdsPage';
import { useGetAdsV2 } from '../hooks/useGetAdsV2';

export const V2Home = () => {
  const { ads, isLoading } = useGetAdsV2();
  return (
    <Switch>
      <Route
        path="/"
        exact
        children={<AdsPage ads={ads} isLoading={isLoading} />}
      />
    </Switch>
  );
};