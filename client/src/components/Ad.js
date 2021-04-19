import React from 'react';
import { Card } from 'react-bootstrap';

export const Ad = ({ ad }) => {
  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={ad.photo} style={{ height: 300 }} />
        <Card.Body>
          <Card.Title style={{ textAlign: 'center' }}>{ad.title}</Card.Title>
          <Card.Text style={{ textAlign: 'center' }}>${ad.price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
