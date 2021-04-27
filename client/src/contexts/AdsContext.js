import React, { useReducer, useMemo, createContext } from 'react';

export const ACTIONS = {
  LOAD_ADS: 'load-ads',
  UPDATE_ADS: 'update-ads',
  ERROR: 'error',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOAD_ADS:
      return { ...state, isLoading: true, ads: [] };
    case ACTIONS.UPDATE_ADS:
      return { ...state, isLoading: false, ads: action.payload.ads };
    case ACTIONS.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        ads: [],
      };
    default:
      return state;
  }
};

const initialState = {
  isLoading: false,
  ads: [],
  error: null,
};

export const AdsContext = createContext(initialState);

export const AdsProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // cache state to prevent re-render when state doesn't change
  const value = useMemo(() => [state, dispatch], [state]);
  return <AdsContext.Provider value={value} {...props} />;
};
