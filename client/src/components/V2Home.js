import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { V2AdDeck } from './V2AdDeck';
import SpinnerWrapper from './SpinnerWrapper';
import { useGetAdsV2 } from '../hooks/useGetAdsV2';

export const V2Home = () => {
  const { ads, isLoading } = useGetAdsV2();

  return isLoading ? (
    <SpinnerWrapper isLoading={isLoading} />
  ) : (
    <Switch>
      <Route path="/" exact children={<V2AdDeck ads={ads} />} />
    </Switch>
  );
};
