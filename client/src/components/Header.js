import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export const Header = () => {
  let history = useHistory();
  const handleClick = () => {
    history.push('/ads/create');
  }

  return (
    <Jumbotron className="text-center">
      <h1>Nelly's List</h1>
      <p>List of all international nellyslist online classifieds sites.</p>
      <p>
        <Button variant="primary" onClick={handleClick} >Create Ad</Button>
      </p>
    </Jumbotron>
  );
};
