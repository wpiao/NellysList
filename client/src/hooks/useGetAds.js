import { useState, useEffect } from 'react';
import { getAds } from '../api/apiUtils';

export const useGetAds = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchGetAds = async () => {
      const res = await getAds();
      setAds(res);
    };
    fetchGetAds();
  }, []);

  return ads;
};
