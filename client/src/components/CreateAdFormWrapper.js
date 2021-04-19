import React from 'react';
import { CreateAdForm } from './CreateAdForm';

export const CreateAdFormWrapper = () => {
  const createAd = (ad) => {
    // TODO: Call POST /api/ads
  };

  // TODO: Used for PUT /api/ad (useParams from react-router-dom)
  const id = null;
  return (
    <>
      <CreateAdForm id={id} handleSubmit={createAd} />
    </>
  );
};
