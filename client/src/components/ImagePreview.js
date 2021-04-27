import React from 'react';
import { Container, Figure } from 'react-bootstrap';

export const ImagePreview = ({ previewSource }) => {
  return previewSource ? (
    <Container className="p-0">
      <img
        src={previewSource}
        alt="preview"
        style={{ width: '100%', height: 'auto' }}
      />
    </Container>
  ) : (
    <Figure>
      <Figure.Image
        width={350}
        height={350}
        alt="350x350"
        src="https://via.placeholder.com/350"
      />
    </Figure>
  );
};
