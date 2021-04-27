import React from 'react';
import { V2Ad } from './V2Ad';
import { CardDeck, CardColumns, Container } from 'react-bootstrap';

export const V2AdDeck = ({ ads }) => {
  return (
    <Container>
      <CardDeck>
        <CardColumns>
          {ads.map((ad, i) => (
            <V2Ad key={i} ad={ad} />
          ))}
        </CardColumns>
      </CardDeck>
    </Container>
  );
};
