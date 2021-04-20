import { useState, useEffect } from 'react';
import { getAds } from '../api/apiUtils';

export const useGetAds = () => {
  const [ads, setAds] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGetAds = async () => {
      setLoading(true);
      const res = await getAds();
      setAds(res);
      setLoading(false);
    };
    fetchGetAds();
  }, []);

  return {
    ads,
    setAds,
    isLoading,
  };
};
