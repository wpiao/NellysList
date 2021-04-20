import React, { useState } from 'react';
import { CreateAdForm } from './CreateAdForm';
import { postAds, getAds } from '../api/apiUtils';
import { useAlert } from 'react-alert';
import SpinnerWrapper from './SpinnerWrapper';

export const CreateAdFormWrapper = ({ updateAds }) => {
  const [isLoading, setLoading] = useState(false);
  const alert = useAlert();

  const createAd = async (ad) => {
    setLoading(true);
    try {
      // POST ads
      await postAds(ad);
      // GET ads
      const res = await getAds();
      // Success alert
      alert.show('Successfully Saved!', { type: 'success' });
      // Update parent ads state
      updateAds(res);
    } catch (error) {
      // Error alert
      alert.show('Something Went Wrong!', { type: 'error' });
      console.log(error);
    }
    setLoading(false);
  };

  // TODO: Used for PUT /api/ad (useParams from react-router-dom)
  const id = null;
  return (
    <>
      <SpinnerWrapper isLoading={isLoading} />
      <CreateAdForm id={id} handleSubmit={createAd} />
    </>
  );
};
