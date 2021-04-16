import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

export const Header = () => {
  return (
    <Jumbotron className="text-center">
      <h1>Nelly's List</h1>
      <p>List of all international nellyslist online classifieds sites.</p>
      <p>
        <Button variant="primary">Create Ad</Button>
      </p>
    </Jumbotron>
  );
};
