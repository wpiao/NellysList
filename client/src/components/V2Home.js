import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useGetAdsV2 } from '../hooks/useGetAdsV2';
import { AdsPage } from './AdsPage';
import { V2CreateAdForm } from './V2CreateAdForm';
import { ACTIONS } from '../contexts/AdsContext';
import { postAds, getAds, postUpload } from '../api/apiUtils';
import { useAlert } from 'react-alert';

export const V2Home = () => {
  const { ads, isLoading, dispatch } = useGetAdsV2();
  const alert = useAlert();

  const createAd = async (ad, base64encodedImage, selectedFile) => {
    dispatch({ type: ACTIONS.LOAD_ADS });

    if (selectedFile) {
      // First, attempt to upload image
      const imageUrl = await postUpload(base64encodedImage);
      ad.photo = imageUrl ? imageUrl : null;
    }

    try {
      await postAds(ad);
      const res = await getAds();

      dispatch({
        type: ACTIONS.GET_ADS,
        payload: { ads: res },
      });

      alert.show('Successfully Saved!', { type: 'success' });
    } catch (err) {
      alert.show('Something Went Wrong!', { type: 'error' });
      console.log(err);
    }
  };

  return (
    <Switch>
      <Route
        path="/"
        exact
        children={<AdsPage ads={ads} isLoading={isLoading} />}
      />
      <Route
        path="/ads/create"
        children={
          <V2CreateAdForm isLoading={isLoading} handleSubmit={createAd} />
        }
      />
    </Switch>
  );
};
