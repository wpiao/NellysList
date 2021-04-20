import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { AdDeck } from './AdDeck';
import { CreateAdFormWrapper } from './CreateAdFormWrapper';
import { useGetAds } from '../hooks/useGetAds';
import { AdDetails } from './AdDetails';

export const Home = () => {
  const { ads, setAds } = useGetAds();
  const [ad, setAd] = useState({});

  const handleUpdateAds = (res) => {
    setAds(res);
  };

  return (
    <Switch>
      <Route path="/" exact children={<AdDeck ads={ads} setAd={setAd} />} />
      <Route
        path="/ads/create"
        children={<CreateAdFormWrapper updateAds={handleUpdateAds} />}
      />
      <Route
        path={`/ad/${ad.id}`}
        children={<AdDetails ad={ad} />}
      />
    </Switch>
  );
};
