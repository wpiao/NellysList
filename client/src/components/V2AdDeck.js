import React from 'react';
// import { V2Ad } from './V2Ad';
import { CardDeck, CardColumns, Container } from 'react-bootstrap';

export const V2AdDeck = () => {
  return (
    <Container>
      <CardDeck>
        <CardColumns>
          {/* {ads.map((ad, i) => (
            <V2Ad key={i} ad={ad} setAd={setAd} />
          ))} */}
        </CardColumns>
      </CardDeck>
    </Container>
  );
};
