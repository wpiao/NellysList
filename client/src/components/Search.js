import React, { useState } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

export const Search = ({ ads, searchAds }) => {
  const [input, setInput] = useState('');

  const handleSearchOnChange = e => {
    setInput(e.target.value);
    const result = ads.filter(ad => ad.title.toLowerCase().match(input.toLowerCase()));
    searchAds(result);
  };

  return (
    <>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Enter keyword"
          aria-label="search bar"
          aria-describedby="basic-addon2"
          onChange={handleSearchOnChange}
          value={input}
        />
      </InputGroup>
    </>
  );
};
