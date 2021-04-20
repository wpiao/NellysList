import React from 'react';
import { CreateAdForm } from './CreateAdForm';
import { postAds, getAds } from '../api/apiUtils';

export const CreateAdFormWrapper = (props) => {
  const { updateAds } = props;

  const createAd = async (ad) => {
    try {
      const id = await postAds(ad);
      console.log('id', id);
      const res = await getAds();
      updateAds(res);
      // TODO: success message, send back to home page
    } catch (error) {
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
