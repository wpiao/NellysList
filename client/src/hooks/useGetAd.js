import { useState, useEffect, useContext } from 'react';
import { getLatLngByZipCode, getAd } from '../api/apiUtils';
import { useParams } from 'react-router-dom';
import { AdsContext, ACTIONS } from '../contexts/AdsContext';

export const useGetAd = () => {
  const { id } = useParams();
  const [coordinates, setCoordinates] = useState(null);
  const [adsState, dispatch] = useContext(AdsContext);
  const { ad, isLoadingAd, adError } = adsState;

  useEffect(() => {
    dispatch({ type: ACTIONS.LOAD_AD });
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
      try {
        const res = await getAd(id);
        await getMapData(res.zipCode);
        dispatch({
          type: ACTIONS.GET_AD,
          payload: { ad: res },
        });
      } catch (error) {
        dispatch({ type: ACTIONS.ERROR, payload: { error: error } });
      }
    };

    initAd();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  return { ad, coordinates, isLoadingAd, adError };
};
