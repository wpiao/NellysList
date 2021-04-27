import React, { useReducer, useMemo, createContext } from 'react';

export const ACTIONS = {
  LOAD_ADS: 'load-ads',
  GET_ADS: 'get-ads',
  SEARCH_ADS: 'set-filtered-ads',
  ERROR: 'error',
  LOAD_AD: 'load-ad',
  GET_AD: 'get-ad',
  ERROR_AD: 'error-ad',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOAD_ADS:
      return { ...state, isLoadingAds: true, ads: [] };
    case ACTIONS.GET_ADS:
      return {
        ...state,
        isLoadingAds: false,
        ads: action.payload.ads,
        searchedAds: action.payload.ads,
      };
    case ACTIONS.SEARCH_ADS:
      return { ...state, ads: action.payload.ads };
    case ACTIONS.ERROR:
      return {
        ...state,
        isLoadingAds: false,
        error: action.payload.error,
        ads: [],
      };
    case ACTIONS.LOAD_AD:
      return { ...state, isLoadingAd: true, ad: null };
    case ACTIONS.GET_AD:
      return {
        ...state,
        isLoadingAd: false,
        ad: action.payload.ad,
      };
    case ACTIONS.ERROR_AD:
      return {
        ...state,
        isLoadingAd: false,
        adError: action.payload.error,
        ad: null,
      };
    default:
      return state;
  }
};

const initialState = {
  isLoadingAds: false,
  ads: [],
  searchedAds: [],
  error: null,
  isLoadingAd: false,
  ad: null,
  adError: null,
};

export const AdsContext = createContext(initialState);

export const AdsProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // cache state to prevent re-render when state doesn't change
  const value = useMemo(() => [state, dispatch], [state]);
  return <AdsContext.Provider value={value} {...props} />;
};
