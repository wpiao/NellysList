import { useState, useEffect, useContext } from 'react';
import { getLatLngByZipCode } from '../api/apiUtils';
import { AdsContext, ACTIONS } from '../contexts/AdsContext';
import { client } from '../components/V2App';
import { GET_AD_BY_ID } from '../GraphQL/queries';

export const useGetAd = (id, mapOption) => {
  const [isLoadingMap, setLoadingMap] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [adsState, dispatch] = useContext(AdsContext);
  const { ad } = adsState;

  const getMapData = async (zipCode) => {
    setLoadingMap(true);
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
    setLoadingMap(false);
  };

  useEffect(() => {
    const getAd = async () => {
      dispatch({ type: ACTIONS.LOAD_AD });
      try {
        const res = id
          ? await client.query({
              query: GET_AD_BY_ID,
              variables: { id },
            })
          : null;

        if (mapOption && res?.data?.ad) {
          await getMapData(res.data.ad.zipCode);
        }

        dispatch({
          type: ACTIONS.GET_AD,
          payload: { ad: res?.data?.ad || ad },
        });
      } catch (error) {
        dispatch({ type: ACTIONS.ERROR_AD, payload: { error: error } });
      }
    };

    getAd();

    return () => {
      dispatch({ type: ACTIONS.CLEAN_AD });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { coordinates, isLoadingMap };
};
