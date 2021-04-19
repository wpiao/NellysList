import React, { useState } from 'react';
import { Container, Col, Form, Button } from 'react-bootstrap';
import { CONDITION } from './Condition';

export const CreateAdForm = (props) => {
  const { id, handleSubmit } = props;
  const [ad, setAd] = useState({});

  const handleTitleChange = (e) => {
    setAd({ ...ad, title: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setAd({ ...ad, description: e.target.value });
  };

  const handlePriceChange = (e) => {
    setAd({ ...ad, price: e.target.value });
  };

  const handleConditionChange = (e) => {
    setAd({ ...ad, condition: e.target.value });
  };

  const handlePhotoURLChange = (e) => {
    setAd({ ...ad, photoUrl: e.target.value });
  };

  const handleEmailChange = (e) => {
    setAd({ ...ad, email: e.target.value });
  };

  const handleZipCodeChange = (e) => {
    setAd({ ...ad, zipCode: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(ad);
  };

  return (
    <Container>
      <Form onSubmit={submit}>
        <Form.Row>
          <Col xs={6}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                onChange={handleTitleChange}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                onChange={handleDescriptionChange}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Price"
                onChange={handlePriceChange}
              />
            </Form.Group>
            <Form.Group controlId="condition">
              <Form.Label>Condition</Form.Label>
              <Form.Control as="select" custom onChange={handleConditionChange}>
                <option>Select Condition</option>
                <option>{CONDITION.NEW}</option>
                <option>{CONDITION.OLD}</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="photo-url">
              <Form.Label>Photo URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Photo URL"
                onChange={handlePhotoURLChange}
              />
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Email"
                onChange={handleEmailChange}
              />
            </Form.Group>
            <Form.Group controlId="zip-code">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Zip Code"
                onChange={handleZipCodeChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              value={id ? 'Save Ad' : 'Create Ad'}
            >
              Create
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </Container>
  );
};
