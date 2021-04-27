import ajax from 'superagent';
import { useEffect, useContext } from 'react';
import { AdsContext, ACTIONS } from '../contexts/AdsContext';

export const useGetAdsV2 = () => {
  const [adsState, dispatch] = useContext(AdsContext);
  const { ads, searchedAds, isLoading, error } = adsState;

  useEffect(() => {
    const fetchGetAds = async () => {
      dispatch({ type: ACTIONS.LOAD_ADS });
      try {
        const res = await ajax.get('/api/ads');
        dispatch({
          type: ACTIONS.SET_INITIAL_ADS,
          payload: { ads: res.body.data.ads || [] },
        });
      } catch (err) {
        dispatch({ type: ACTIONS.ERROR, payload: { error: err } });
      }
    };
    fetchGetAds();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { ads, searchedAds, isLoading, error };
};
