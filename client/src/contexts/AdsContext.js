import React, { useReducer, useMemo, createContext } from 'react';

export const ACTIONS = {
  SEARCH_ADS: 'set-filtered-ads',
  LOAD_ADS: 'load-ads',
  GET_ADS: 'get-ads',
  ERROR_ADS: 'error-ads',
  LOAD_AD: 'load-ad',
  GET_AD: 'get-ad',
  ERROR_AD: 'error-ad',
  LOAD_DELETE_AD: 'load-delete-ad',
  UNLOAD_DELETE_AD: 'unload-delete-ad',
  ERROR_DELETE_AD: 'error-delete-ad',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SEARCH_ADS:
      return { ...state, ads: action.payload.ads };
    case ACTIONS.LOAD_ADS:
      return { ...state, isLoadingAds: true, ads: [] };
    case ACTIONS.GET_ADS:
      return {
        ...state,
        isLoadingAds: false,
        ads: action.payload.ads,
        searchedAds: action.payload.ads,
      };
    case ACTIONS.ERROR_ADS:
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
    case ACTIONS.LOAD_DELETE_AD:
      return {
        ...state,
        isLoadingDelete: true,
      };
    case ACTIONS.UNLOAD_DELETE_AD:
      return {
        ...state,
        isLoadingDelete: false,
      };
    default:
      return state;
  }
};

const initialState = {
  searchedAds: [],
  isLoadingAds: false,
  ads: [],
  error: null,
  isLoadingAd: false,
  ad: null,
  adError: null,
  isLoadingDelete: false,
};

export const AdsContext = createContext(initialState);

export const AdsProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // cache state to prevent re-render when state doesn't change
  const value = useMemo(() => [state, dispatch], [state]);
  return <AdsContext.Provider value={value} {...props} />;
};
