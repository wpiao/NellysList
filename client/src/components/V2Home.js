import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useGetAdsV2 } from '../hooks/useGetAdsV2';
import { AdsPage } from './AdsPage';
import { V2CreateAdForm } from './V2CreateAdForm';
import { ACTIONS } from '../contexts/AdsContext';
import { postUpload } from '../api/apiUtils';
import { useAlert } from 'react-alert';
import { V2AdDetails } from './V2AdDetails';
import { V2CreateAdFormWrapper } from './V2CreateAdFormWrapper';
import { client } from '../components/V2App';
import { gql } from '@apollo/client';

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
      await client.mutate({
        mutation: gql`
          mutation {
            createAd(
              title: "${ad.title}",
              price: ${ad.price},
              description: "${ad.description}",
              photo: "${ad.photo}",
              condition: "${ad.condition}",
              email: "${ad.email}",
              zipCode: "${ad.zipCode}",
            ) {
              id
              title
              description
              price
              photo
              condition
              email
              zipCode
              modifiedDate
              createdDate
            }
          }
        `,
      });

      const res = await client.query({
        query: gql`
          query getAds {
            ads {
              id
              title
              price
              photo
            }
          }
        `,
        // fetching from cache will not have newly created ad. disable cache to get the latest fetch.
        fetchPolicy: 'no-cache',
      });

      dispatch({
        type: ACTIONS.GET_ADS,
        payload: { ads: res?.data?.ads || ads },
      });

      alert.show('Successfully Saved!', { type: 'success' });
    } catch (err) {
      dispatch({ type: ACTIONS.ERROR_ADS, payload: { error: err } });
      alert.show('Something Went Wrong!', { type: 'error' });
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
      <Route path="/ad/:id/edit" exact children={<V2CreateAdFormWrapper />} />
    </Switch>
  );
};
