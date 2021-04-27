import ajax from 'superagent';
import { useEffect, useContext } from 'react';
import { AdsContext, ACTIONS } from '../contexts/AdsContext';

export const useGetAdsV2 = () => {
  const [adsState, dispatch] = useContext(AdsContext);

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
  }, [dispatch]);

  return {
    ads: adsState.ads,
    isLoading: adsState.isLoading,
  };
};
