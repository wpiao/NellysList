import React, { useContext } from 'react';
import { V2CreateAdForm } from './V2CreateAdForm';
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';
import { AdsContext, ACTIONS } from '../contexts/AdsContext';
import { client } from '../components/V2App';
import { gql } from '@apollo/client';
import { postUpload } from '../api/apiUtils';

export const V2CreateAdFormWrapper = () => {
  const [adsState, dispatch] = useContext(AdsContext);
  const { ads } = adsState;
  const alert = useAlert();
  const { id } = useParams();

  const updateAd = async (ad, base64encodedImage, selectedFile) => {
    dispatch({ type: ACTIONS.LOAD_UPDATE_AD });

    if (ad.photo && selectedFile !== null) {
      const imageUrl = await postUpload(base64encodedImage);
      ad.photo = imageUrl ? imageUrl : null;
    }

    try {
      const mutationRes = await client.mutate({
        mutation: gql`
          mutation {
            updateAd(
              id: "${ad.id}",
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
              price
              description
              photo
              condition
              email
              zipCode
              modifiedDate
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
        fetchPolicy: 'no-cache',
      });

      if (res.loading) {
        dispatch({ type: ACTIONS.LOAD_ADS });
      }

      dispatch({
        type: ACTIONS.GET_ADS,
        payload: { ads: res?.data?.ads || ads },
      });

      if (mutationRes?.data?.updateAd) {
        alert.show('Successfully Saved!', { type: 'success' });
      }

      dispatch({ type: ACTIONS.UNLOAD_UPDATE_AD });
    } catch (err) {
      dispatch({ type: ACTIONS.ERROR_ADS, payload: { error: err } });
      alert.show('Something Went Wrong!', { type: 'error' });
      dispatch({ type: ACTIONS.UNLOAD_UPDATE_AD });
    }
  };

  return <V2CreateAdForm id={id} handleSubmit={updateAd} />;
};
