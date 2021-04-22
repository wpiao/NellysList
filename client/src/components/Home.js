import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { AdDeck } from './AdDeck';
import { CreateAdForm2 } from './CreateAdForm2';
import { CreateAdFormWrapper } from './CreateAdFormWrapper';
import { useGetAds } from '../hooks/useGetAds';
import SpinnerWrapper from './SpinnerWrapper';
import { AdDetails } from './AdDetails';
import { useAlert } from 'react-alert';
import { postAds, getAds, postUpload } from '../api/apiUtils';

export const Home = () => {
  const { ads, setAds, isLoading } = useGetAds();
  const [ad, setAd] = useState({});
  const alert = useAlert();

  const uploadImage = async (base64encodedImage) => {
    let imageUrl = null;
    try {
      const uploadResponse = await postUpload(base64encodedImage);
      imageUrl = uploadResponse?.data;
    } catch (error) {
      console.log(error);
    }
    return imageUrl;
  };

  const createAd = async (ad, base64encodedImage) => {
    // First, attempt to upload image
    const imageUrl = await uploadImage(base64encodedImage);
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
