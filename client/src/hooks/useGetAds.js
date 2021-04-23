import { useState, useEffect } from 'react';
import { getAds } from '../api/apiUtils';

export const useGetAds = () => {
  const [ads, setAds] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [searched, setSearched] = useState([]);

  useEffect(() => {
    const fetchGetAds = async () => {
      setLoading(true);
      const res = await getAds();
      if (res) {
        setAds(res);
        setSearched(res);
      };
      setLoading(false);
    };
    fetchGetAds();
  }, []);

  return {
    ads,
    setAds,
    isLoading,
    searched,
    setSearched,
  };
};
