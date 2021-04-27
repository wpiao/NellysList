import { useEffect, useContext } from 'react';
import { AdsContext, ACTIONS } from '../contexts/AdsContext';
import { getAds } from '../api/apiUtils';

export const useGetAdsV2 = () => {
  const [adsState, dispatch] = useContext(AdsContext);
  const { ads, searchedAds, isLoading, error } = adsState;

  useEffect(() => {
    const fetchGetAds = async () => {
      dispatch({ type: ACTIONS.LOAD_ADS });
      try {
        const res = await getAds();
        dispatch({
          type: ACTIONS.GET_ADS,
          payload: { ads: res },
        });
      } catch (err) {
        dispatch({ type: ACTIONS.ERROR, payload: { error: err } });
      }
    };
    fetchGetAds();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { ads, searchedAds, isLoading, error, dispatch };
};
