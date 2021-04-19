import React, { useState, useEffect } from 'react';
import { getAds } from '../api/apiUtils';

export const useGetAds = () => {
  const [ads, setAds] = useState([]);

  useEffect(async () => {
    const ads = await getAds();
    setAds(ads);
  }, []);

  return ads;
};
