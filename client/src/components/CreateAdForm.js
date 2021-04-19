import React from 'react';
import { Container, Col, Form, Button } from 'react-bootstrap';

export const CreateAdForm = () => {
  return (
    <Container>
      <Form>
        <Form.Row>
          <Col xs={6}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter Title" />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter Description" />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control type="text" placeholder="Enter Price" />
            </Form.Group>
            <Form.Group controlId="condition">
              <Form.Label>Condition</Form.Label>
              <Form.Control type="text" placeholder="Enter Condition" />
            </Form.Group>
            <Form.Group controlId="photo-url">
              <Form.Label>Photo URL</Form.Label>
              <Form.Control type="text" placeholder="Enter Photo URL" />
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="Enter Email" />
            </Form.Group>
            <Form.Group controlId="zip-code">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control type="text" placeholder="Enter Zip Code" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </Container>
  );
};
