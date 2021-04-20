import React from 'react';
import { Spinner } from 'react-bootstrap';

const SpinnerWrapper = ({ isLoading }) => {
  return isLoading ? (
    <div className="d-flex justify-content-center">
      <Spinner animation="border" variant="primary" />
    </div>
  ) : (
    <></>
  );
};

export default SpinnerWrapper;
