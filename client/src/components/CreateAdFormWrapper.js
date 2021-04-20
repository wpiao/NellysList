import React from 'react';
import { CreateAdForm } from './CreateAdForm';
import { postAds, getAds } from '../api/apiUtils';
import { useAlert } from 'react-alert';

export const CreateAdFormWrapper = ({ updateAds }) => {
  const alert = useAlert();

  const createAd = async (ad) => {
    try {
      await postAds(ad);
      const res = await getAds();
      alert.show('Ad Successfully Saved!', { type: 'success' });
      updateAds(res);
      // TODO: success message, send back to home page
    } catch (error) {
      alert.show('Something Went Wrong!', { type: 'error' });
      console.log(error);
    }
  };

  // TODO: Used for PUT /api/ad (useParams from react-router-dom)
  const id = null;
  return (
    <>
      <CreateAdForm id={id} handleSubmit={createAd} />
    </>
  );
};
