import React, { useState, useContext } from 'react';
import { Container, FormControl } from 'react-bootstrap';
import { AdsContext, ACTIONS } from '../contexts/AdsContext';

export const V2Search = () => {
  const [input, setInput] = useState('');
  const [adsState, dispatch] = useContext(AdsContext);
  const { searchedAds } = adsState;

  const handleSearch = (e) => {
    const val = e.target.value;
    const filtered = searchedAds.filter((ad) => {
      return ad.title.toLowerCase().includes(val.toLowerCase());
    });
    setInput(val);
    dispatch({ type: ACTIONS.SET_FILTERED_ADS, payload: { ads: filtered } });
  };

  return (
    <Container className="mb-3">
      <FormControl
        placeholder="Enter keyword"
        aria-label="search bar"
        onChange={handleSearch}
        value={input}
      />
    </Container>
  );
};
