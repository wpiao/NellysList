import React, { useState, useEffect } from 'react';
import { CreateAdForm } from './CreateAdForm';
import { getAds, putAds, postUpload } from '../api/apiUtils';
import { useAlert } from 'react-alert';
import SpinnerWrapper from './SpinnerWrapper';
import { useParams, useHistory } from 'react-router-dom';

export const CreateAdFormWrapper = ({ currentAd, updateAds }) => {
  const [isLoadingPUT, setLoadingPUT] = useState(false);
  const alert = useAlert();
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (Object.keys(currentAd).length === 0) {
      history.push('/');
    }
  }, [currentAd, history]);

  const updateAd = async (ad, base64encodedImage, selectedFile) => {
    setLoadingPUT(true);

    if (ad.photo && selectedFile !== null) {
      const imageUrl = await postUpload(base64encodedImage);
      ad.photo = imageUrl ? imageUrl : null;
    }

    try {
      await putAds(ad);
      const res = await getAds();
      alert.show('Successfully Saved!', { type: 'success' });
      updateAds(res);
    } catch (error) {
      alert.show('Something Went Wrong!', { type: 'error' });
      console.log(error);
    }
    setLoadingPUT(false);
  };

  return (
    <>
      <SpinnerWrapper isLoading={isLoadingPUT} />
      <CreateAdForm id={id} handleSubmit={updateAd} currentAd={currentAd} />
    </>
  );
};
