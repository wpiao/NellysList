import { useEffect, useContext } from 'react';
import { AdsContext, ACTIONS } from '../contexts/AdsContext';
import { GET_ADS } from '../GraphQL/queries';
import { client } from '../components/V2App';


export const useGetAdsV2 = () => {
  const [adsState, dispatch] = useContext(AdsContext);
  const { ads, searchedAds, isLoadingAds, error } = adsState;

  useEffect(() => {
    const getAds = async () => {
      dispatch({ type: ACTIONS.LOAD_ADS });
      try {
        const res = await client.query({ query: GET_ADS });
        dispatch({
          type: ACTIONS.GET_ADS,
          payload: { ads: res?.data?.ads || ads }
        });
      } catch (err) {
        dispatch({ type: ACTIONS.ERROR_ADS, payload: { error: err } });
      }
    }

    getAds();
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  return { ads, searchedAds, isLoadingAds, error, dispatch };
};
