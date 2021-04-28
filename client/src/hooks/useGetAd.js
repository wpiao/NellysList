import { useState, useEffect, useContext } from 'react';
import { getLatLngByZipCode } from '../api/apiUtils';
import { useParams } from 'react-router-dom';
import { AdsContext, ACTIONS } from '../contexts/AdsContext';
import { useQuery } from '@apollo/client';
import { GET_AD_BY_ID } from '../GraphQL/queries';

export const useGetAd = () => {
  const { id } = useParams();
  const [coordinates, setCoordinates] = useState(null);
  const [adsState, dispatch] = useContext(AdsContext);
  const { ad, isLoadingAd, adError } = adsState;
  const { loading, error, data } = useQuery(GET_AD_BY_ID, {
    variables: { id }
  });

  useEffect(() => {
    const getMapData = async (zipCode) => {
      try {
        const res = await getLatLngByZipCode(zipCode);
        if (res?.results?.length) {
          setCoordinates({
            lat: res.results[0]?.geometry?.location?.lat,
            lng: res.results[0]?.geometry?.location?.lng,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    const initAd = async () => {
      if (loading) {
        dispatch({ type: ACTIONS.LOAD_AD });
      }
      if (error) {
        dispatch({ type: ACTIONS.ERROR, payload: { error: error } });
      }
      if (data) {
        await getMapData(data.ad.zipCode);
        dispatch({
          type: ACTIONS.GET_AD,
          payload: { ad: data.ad },
        });
      }
    };

    initAd();
  }, [id, data]);

  return { ad, coordinates, isLoadingAd, adError };
};
