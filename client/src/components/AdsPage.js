import React from 'react';
import { V2AdDeck } from './V2AdDeck';
import { V2Search } from './V2Search';
import SpinnerWrapper from './SpinnerWrapper';

export const AdsPage = ({ ads, isLoading }) => {
  return isLoading ? (
    <SpinnerWrapper isLoading={isLoading} />
  ) : (
    <>
      <V2Search />
      <V2AdDeck ads={ads} />
    </>
  );
};
