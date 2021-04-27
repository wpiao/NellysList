import ajax from 'superagent';
import { useEffect, useContext } from 'react';
import { AdsContext, ACTIONS } from '../contexts/AdsContext';

export const useGetAdsV2 = () => {
  const [adsState, dispatch] = useContext(AdsContext);
  const { ads, isLoading, error } = adsState;

  useEffect(() => {
    const fetchGetAds = async () => {
      dispatch({ type: ACTIONS.LOAD_ADS });
      try {
        const res = await ajax.get('/api/ads');
        dispatch({ type: ACTIONS.UPDATE_ADS, payload: { ads: res.body } });
        // TODO: Set searchAds state
      } catch (err) {
        dispatch({ type: ACTIONS.ERROR, payload: { error: err } });
      }
    };
    fetchGetAds();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { ads, isLoading, error };
};
