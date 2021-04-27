import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useGetAdsV2 } from '../hooks/useGetAdsV2';
import { AdsPage } from './AdsPage';
import { V2CreateAdForm } from './V2CreateAdForm';
import { ACTIONS } from '../contexts/AdsContext';
import { postAds, getAds, postUpload } from '../api/apiUtils';
import { useAlert } from 'react-alert';
import { V2AdDetails } from './V2AdDetails';

export const V2Home = () => {
  const { ads, isLoadingAds, dispatch } = useGetAdsV2();
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
        children={<AdsPage ads={ads} isLoadingAds={isLoadingAds} />}
      />
      <Route
        path="/ads/create"
        children={
          <V2CreateAdForm isLoading={isLoadingAds} handleSubmit={createAd} />
        }
      />
      <Route path="/ad/:id" exact children={<V2AdDetails />} />
    </Switch>
  );
};
