import React, { useReducer, useMemo, createContext } from 'react';

export const ACTIONS = {
  SEARCH_ADS: 'set-filtered-ads',
  LOAD_ADS: 'load-ads',
  GET_ADS: 'get-ads',
  ERROR_ADS: 'error-ads',
  LOAD_AD: 'load-ad',
  GET_AD: 'get-ad',
  ERROR_AD: 'error-ad',
  LOAD_CREATE_AD: 'load-create-ad',
  UNLOAD_CREATE_AD: 'unload-create-ad',
  ERROR_CREATE_AD: 'error-create-ad',
  LOAD_UPDATE_AD: 'load-update-ad',
  UNLOAD_UPDATE_AD: 'unload-update-ad',
  ERROR_UPDATE_AD: 'error-update-ad',
  LOAD_DELETE_AD: 'load-delete-ad',
  UNLOAD_DELETE_AD: 'unload-delete-ad',
  CLEAN_AD: 'clean-ad',
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
    case ACTIONS.LOAD_CREATE_AD:
      return {
        ...state,
        isLoadingCreate: true,
      };
    case ACTIONS.UNLOAD_CREATE_AD:
      return {
        ...state,
        isLoadingCreate: false,
      };
    case ACTIONS.LOAD_UPDATE_AD:
      return {
        ...state,
        isLoadingUpdate: true,
      };
    case ACTIONS.UNLOAD_UPDATE_AD:
      return {
        ...state,
        isLoadingUpdate: false,
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
    case ACTIONS.CLEAN_AD:
      return {
        ...state,
        ad: null,
        isLoadingAd: true,
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
  isLoadingAd: true,
  ad: null,
  adError: null,
  isLoadingCreate: false,
  isLoadingUpdate: false,
  isLoadingDelete: false,
};

export const AdsContext = createContext(initialState);

export const AdsProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // cache state to prevent re-render when state doesn't change
  const value = useMemo(() => [state, dispatch], [state]);
  return <AdsContext.Provider value={value} {...props} />;
};
