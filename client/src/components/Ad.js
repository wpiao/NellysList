import React from 'react';
import { Card } from 'react-bootstrap';

export const Ad = ({ ad }) => {
  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={ad.photo} />
        <Card.Body>
          <Card.Title>{ad.title}</Card.Title>
          <Card.Text>{ad.price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
