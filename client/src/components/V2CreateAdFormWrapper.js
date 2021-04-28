import React, { useContext } from 'react';
import { V2CreateAdForm } from './V2CreateAdForm';
import { getAds, putAds, postUpload } from '../api/apiUtils';
import { useAlert } from 'react-alert';
import SpinnerWrapper from './SpinnerWrapper';
import { useParams } from 'react-router-dom';
import { AdsContext, ACTIONS } from '../contexts/AdsContext';

export const V2CreateAdFormWrapper = () => {
  const [adsState, dispatch] = useContext(AdsContext);
  const { isLoadingAds } = adsState;
  const alert = useAlert();
  const { id } = useParams();

  const updateAd = async (ad, base64encodedImage, selectedFile) => {
    dispatch({ type: ACTIONS.LOAD_ADS });

    if (ad.photo && selectedFile !== null) {
      const imageUrl = await postUpload(base64encodedImage);
      ad.photo = imageUrl ? imageUrl : null;
    }

    try {
      await putAds(ad);
      const res = await getAds();

      dispatch({
        type: ACTIONS.GET_ADS,
        payload: { ads: res },
      });

      alert.show('Successfully Saved!', { type: 'success' });
    } catch (err) {
      dispatch({ type: ACTIONS.ERROR_ADS, payload: { error: err } });
      alert.show('Something Went Wrong!', { type: 'error' });
    }
  };

  return (
    <>
      <SpinnerWrapper isLoading={isLoadingAds} />
      <V2CreateAdForm id={id} handleSubmit={updateAd} />
    </>
  );
};
