import React, { useContext } from 'react';
import { V2CreateAdForm } from './V2CreateAdForm';
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';
import { AdsContext, ACTIONS } from '../contexts/AdsContext';
import { client } from '../components/V2App';
import { postUpload } from '../api/apiUtils';
import { GET_ADS } from '../GraphQL/queries';
import { UPDATE_AD } from '../GraphQL/mutations';

export const V2CreateAdFormWrapper = () => {
  const [adsState, dispatch] = useContext(AdsContext);
  const { ads } = adsState;
  const alert = useAlert();
  const { id } = useParams();

  const updateAd = async (
    { id, title, description, price, photo, condition, email, zipCode },
    base64encodedImage,
    selectedFile
  ) => {
    dispatch({ type: ACTIONS.LOAD_UPDATE_AD });

    if (photo && selectedFile !== null) {
      const imageUrl = await postUpload(base64encodedImage);
      photo = imageUrl ? imageUrl : null;
    }

    try {
      const mutationRes = await client.mutate({
        mutation: UPDATE_AD,
        variables: {
          id,
          title,
          description,
          price: parseFloat(price),
          photo,
          condition,
          email,
          zipCode,
        },
      });

      const res = await client.query({
        query: GET_ADS,
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
      console.log(err);
      dispatch({ type: ACTIONS.ERROR_ADS, payload: { error: err } });
      alert.show('Something Went Wrong!', { type: 'error' });
      dispatch({ type: ACTIONS.UNLOAD_UPDATE_AD });
    }
  };

  return <V2CreateAdForm id={id} handleSubmit={updateAd} />;
};
