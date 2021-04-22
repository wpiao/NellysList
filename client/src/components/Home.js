import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { AdDeck } from './AdDeck';
import { CreateAdForm } from './CreateAdForm';
import { CreateAdFormWrapper } from './CreateAdFormWrapper';
import { useGetAds } from '../hooks/useGetAds';
import SpinnerWrapper from './SpinnerWrapper';
import { AdDetails } from './AdDetails';
import { useAlert } from 'react-alert';
import { postAds, getAds, postUpload } from '../api/apiUtils';

export const Home = () => {
  const { ads, setAds, isLoading } = useGetAds();
  const [ad, setAd] = useState({});
  const [currentAd, setCurrentAd] = useState({});
  const alert = useAlert();

  const createAd = async (ad, base64encodedImage) => {
    // First, attempt to upload image
    const imageUrl = await postUpload(base64encodedImage);
    ad.photo = imageUrl ? imageUrl : null;
    // FIX THIS: setLoading(true);
    try {
      // POST ads
      await postAds(ad);
      // GET ads
      const res = await getAds();
      // Success alert
      alert.show('Successfully Saved!', { type: 'success' });
      setAds(res);
    } catch (error) {
      // Error alert
      alert.show('Something Went Wrong!', { type: 'error' });
      console.log(error);
    }
    // FIX THIS: setLoading(false);
  };

  const handleUpdateAds = (ads) => {
    setAds(ads);
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
      <Route
        path="/ad/:id"
        exact
        children={<AdDetails ad={ad} setCurrentAd={setCurrentAd} />}
      />
      <Route
        path="/ad/:id/edit"
        exact
        children={
          <CreateAdFormWrapper
            currentAd={currentAd}
            updateAds={handleUpdateAds}
          />
        }
      />
    </Switch>
  );
};
