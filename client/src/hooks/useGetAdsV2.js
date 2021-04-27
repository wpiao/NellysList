import { useEffect, useContext } from 'react';
import { AdsContext, ACTIONS } from '../contexts/AdsContext';
import { useQuery, gql } from '@apollo/client';

const GET_ADS = gql`
  query GetAds {
    ads {
      id
      title
      description
      price
      photo
      condition
      email
      zipCode
      modifiedDate
      createdDate
    }
  }
`;

export const useGetAdsV2 = () => {
  const [adsState, dispatch] = useContext(AdsContext);
  const { ads, searchedAds, isLoadingAds } = adsState;
  const { loading, error, data } = useQuery(GET_ADS);

  useEffect(() => {
    if (loading) {
      dispatch({ type: ACTIONS.LOAD_ADS });
    }
    if (error) {
      dispatch({ type: ACTIONS.ERROR, payload: { error: error } });
    }
    if (data) {
      dispatch({
        type: ACTIONS.GET_ADS,
        payload: { ads: data.ads },
      });
    }
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return { ads, searchedAds, isLoadingAds, error, dispatch };
};
