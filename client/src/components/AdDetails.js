import React from 'react';
import { Container, Col, Card, Form, Button } from 'react-bootstrap';

export const AdDetails = ({ ad }) => {
  return (
    <Container style={{ display: 'flex', justifyContent: 'space-around' }}>
      <Col xs={6}>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={ad.photo} style={{ height: 300 }} />
          <Card.Body>
            <Card.Title style={{ textAlign: 'center' }}>{ad.title} ({ad.condition})</Card.Title>
            <Card.Text style={{ textAlign: 'center' }}>$ {ad.price}</Card.Text>
            <Card.Text style={{ textAlign: 'center' }}>{ad.description}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={6}>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Contact Info</Form.Label>
            <Form.Control type="email" value={ad.email} disabled></Form.Control>
            <br />
            <Form.Control type="zipcode" value={ad.zipCode} disabled></Form.Control>
          </Form.Group>
        </Form>
        <Button variant="primary">Edit</Button>
        <Button variant="danger">Delete</Button>
      </Col>
    </Container>
  );
}
