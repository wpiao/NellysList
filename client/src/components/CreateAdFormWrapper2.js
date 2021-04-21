import React, { useState } from 'react';
import { CreateAdForm2 } from './CreateAdForm2';
import { postAds, getAds } from '../api/apiUtils';
import { useAlert } from 'react-alert';
import SpinnerWrapper from './SpinnerWrapper';
import { useParams } from 'react-router-dom';

export const CreateAdFormWrapper2 = ({ updateAds }) => {
  const [isLoading, setLoading] = useState(false);
  const alert = useAlert();

  const createAd = async (ad, e) => {
    setLoading(true);
    try {
      // POST ads
      await postAds(ad);
      // GET ads
      const res = await getAds();
      // Success alert
      alert.show('Successfully Saved!', { type: 'success' });
      e.target.reset();
      // Update parent ads state
      updateAds(res);
    } catch (error) {
      // Error alert
      alert.show('Something Went Wrong!', { type: 'error' });
      console.log(error);
    }
    setLoading(false);
  };

  const { id } = useParams();
  return (
    <>
      <SpinnerWrapper isLoading={isLoading} />
      <CreateAdForm2 id={id} handleSubmit={createAd} />
    </>
  );
};
