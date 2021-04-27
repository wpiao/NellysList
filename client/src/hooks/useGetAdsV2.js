import { useEffect, useContext } from 'react';
import { AdsContext, ACTIONS } from '../contexts/AdsContext';
import { useQuery, gql } from '@apollo/client';
// import { getAds } from '../api/apiUtils';

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
  const { ads, searchedAds, isLoading } = adsState;
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
        payload: { ads: data.ads }
      })
    }
  }, [data]);

  //------------ This is for API call to the /api/ads----------------
  // useEffect(() => {
  //   const fetchGetAds = async () => {
  //     dispatch({ type: ACTIONS.LOAD_ADS });
  //     try {
  //       const res = await getAds();
  //       dispatch({
  //         type: ACTIONS.GET_ADS,
  //         payload: { ads: res },
  //       });
  //     } catch (err) {
  //       dispatch({ type: ACTIONS.ERROR, payload: { error: err } });
  //     }
  //   };
  //   fetchGetAds();
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { ads, searchedAds, isLoading, error, dispatch };
};
