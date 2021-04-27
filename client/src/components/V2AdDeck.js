import React, { useContext } from 'react';
import { V2Ad } from './V2Ad';
import { CardDeck, CardColumns, Container } from 'react-bootstrap';
import { AdsContext } from '../contexts/AdsContext';

export const V2AdDeck = () => {
  const [adsState] = useContext(AdsContext);
  const { ads } = adsState;

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
