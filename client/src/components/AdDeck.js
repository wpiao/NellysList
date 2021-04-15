import React from 'react';
import { Ad } from './Ad';
import { CardDeck, CardColumns, Container } from 'react-bootstrap';

export const AdDeck = ({ ads }) => {
  return (
    <Container>
      <CardDeck>
        <CardColumns>
          {ads.map((ad, i) => <Ad key={i} ad={ad} />)}
        </CardColumns>
      </CardDeck>
    </Container>
  );
};
