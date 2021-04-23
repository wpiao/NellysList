import React, { useRef } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

export const Search = ({ ads, updateAds }) => {
  const textInput = useRef(null);

  const handleSearch = () => {
    const userInput = textInput.current.value;
    const result = ads.filter(ad => ad.title.toLowerCase().includes(userInput.toLowerCase()));
    updateAds(result);
    textInput.current.value = '';
  };

  return (
    <>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Enter keyword"
          aria-label="search bar"
          aria-describedby="basic-addon2"
          ref={textInput}
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={handleSearch}>Search</Button>
        </InputGroup.Append>
      </InputGroup>
    </>
  );
};
