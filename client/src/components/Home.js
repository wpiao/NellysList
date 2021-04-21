import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { AdDeck } from './AdDeck';
import { CreateAdForm2 } from './CreateAdForm2';
import { CreateAdFormWrapper } from './CreateAdFormWrapper';
import { useGetAds } from '../hooks/useGetAds';
import SpinnerWrapper from './SpinnerWrapper';
import { AdDetails } from './AdDetails';
import { useAlert } from 'react-alert';
import { postAds, getAds, uploadImage } from '../api/apiUtils';

export const Home = () => {
  const { ads, setAds, isLoading } = useGetAds();
  const [ad, setAd] = useState({});
  const alert = useAlert();

  const createAd = async (ad, e) => {
    let imageUrl = null;
    // imageUrl = await uploadImage();
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
        children={<CreateAdForm2 handleSubmit={createAd} />}
      />
      <Route path={'/ad/:id'} exact children={<AdDetails ad={ad} />} />
      <Route path={'/ad/:id/edit'} exact children={<CreateAdFormWrapper />} />
    </Switch>
  );
};
