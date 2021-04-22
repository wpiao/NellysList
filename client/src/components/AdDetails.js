import React from 'react';
import { Container, Col, Card, Form, Button, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export const AdDetails = ({ ad, setCurrentAd }) => {
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/ad/${ad.id}/edit`);
    setCurrentAd(ad);
  };

  return (
    <Container>
      <Row>
        <Col xs={6}>
          <Card style={{ width: 300, margin: 'auto' }}>
            <Card.Img variant="top" src={ad.photo} style={{ height: 300 }} />
            <Card.Body>
              <Card.Title style={{ textAlign: 'center' }}>
                {ad.title} ({ad.condition})
              </Card.Title>
              <Card.Text style={{ textAlign: 'center' }}>
                $ {ad.price}
              </Card.Text>
              <Card.Text style={{ textAlign: 'center' }}>
                {ad.description}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6}>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={ad.email}
                disabled
              ></Form.Control>
              <br />
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                value={ad.zipCode}
                disabled
              ></Form.Control>
            </Form.Group>
          </Form>
          <Button
            variant="primary"
            size="lg"
            className="mr-1"
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button variant="danger" size="lg">
            Delete
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
