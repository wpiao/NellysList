import React, { useState } from 'react';
import { CreateAdForm } from './CreateAdForm';
// import { useAlert } from 'react-alert';
// import SpinnerWrapper from './SpinnerWrapper';
import { useParams } from 'react-router-dom';

export const CreateAdFormWrapper = ({ updateAds }) => {
  // const [isLoading, setLoading] = useState(false);
  // const alert = useAlert();

  const updateAd = () => {
    // TODO: PUT call to BE
  };

  const { id } = useParams();
  return (
    <>
      {/* <SpinnerWrapper isLoading={isLoading} /> */}
      <CreateAdForm id={id} handleSubmit={updateAd} />
    </>
  );
};
