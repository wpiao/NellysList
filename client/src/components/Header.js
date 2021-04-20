import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';

export const Header = () => {
  const history = useHistory();
  const location = useLocation();

  const handleCreateAd = () => {
    history.push('/ads/create');
  };

  const handleGoHome = () => {
    history.push('/');
  };

  const renderHeaderButton = () => {
    return location.pathname === '/' ? (
      <Button variant="primary" onClick={handleCreateAd}>
        Create Ad
      </Button>
    ) : (
      <Button variant="primary" onClick={handleGoHome}>
        Home
      </Button>
    );
  };

  return (
    <Jumbotron className="text-center">
      <h1>Nelly's List</h1>
      <p>List of all international nellyslist online classifieds sites.</p>
      {renderHeaderButton()}
    </Jumbotron>
  );
};
