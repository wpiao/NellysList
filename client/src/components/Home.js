import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { AdDeck } from './AdDeck';
import { CreateAdForm } from './CreateAdForm';
import { useGetAds } from '../hooks/useGetAds';
import SpinnerWrapper from './SpinnerWrapper';
import { AdDetails } from './AdDetails';
import { useAlert } from 'react-alert';
import { postAds, getAds } from '../api/apiUtils';

export const Home = () => {
  const { ads, setAds, isLoading } = useGetAds();
  const [ad, setAd] = useState({});
  const alert = useAlert();

  const createAd = async (ad, e) => {
    // FIX THIS: setLoading(true);
    try {
      // POST ads
      await postAds(ad);
      // GET ads
      const res = await getAds();
      // Success alert
      alert.show('Successfully Saved!', { type: 'success' });
      e.target.reset();
      setAds(res);
    } catch (error) {
      // Error alert
      alert.show('Something Went Wrong!', { type: 'error' });
      console.log(error);
    }
    // FIX THIS: setLoading(false);
  };

  return isLoading ? (
    <SpinnerWrapper isLoading={isLoading} />
  ) : (
    <Switch>
      <Route path="/" exact children={<AdDeck ads={ads} setAd={setAd} />} />
      <Route
        path="/ads/create"
        children={<CreateAdForm handleSubmit={createAd} />}
      />
      <Route path={`/ad/${ad.id}`} children={<AdDetails ad={ad} />} />
    </Switch>
  );
};
