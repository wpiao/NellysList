import React from 'react';
import { Container, FormControl } from 'react-bootstrap';

export const Search = ({ input, onHandleSearch }) => {
  const handleSearch = (e) => {
    onHandleSearch(e);
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
