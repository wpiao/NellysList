import React, { useState } from 'react';
import { Container, Col, Form, Button } from 'react-bootstrap';
import { CONDITION } from './Condition';

const AD_INPUTS = {
  ID: 'id',
  TITLE: 'title',
  PRICE: 'price',
  DESCRIPTION: 'description',
  PHOTO: 'photo',
  CONDITION: 'condition',
  EMAIL: 'email',
  ZIP_CODE: 'zipCode',
};

export const CreateAdForm = ({ id, handleSubmit }) => {
  const [ad, setAd] = useState({});

  const handleOnChange = (e, adKey) => {
    setAd({ ...ad, [adKey]: e.target.value });
  };

  const handlePriceChange = (e) => {
    setAd({
      ...ad,
      price: parseFloat(e.target.value),
    });
  };

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(ad, e);
  };

  return (
    <Container>
      <Form onSubmit={submit}>
        <Form.Row>
          <Col xs={6}>
            <Form.Group controlId={AD_INPUTS.TITLE}>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                onChange={(e) => handleOnChange(e, AD_INPUTS.TITLE)}
              />
            </Form.Group>
            <Form.Group controlId={AD_INPUTS.DESCRIPTION}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                onChange={(e) => handleOnChange(e, AD_INPUTS.DESCRIPTION)}
              />
            </Form.Group>
            <Form.Group controlId={AD_INPUTS.PRICE}>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Price"
                onChange={handlePriceChange}
              />
            </Form.Group>
            <Form.Group controlId={AD_INPUTS.CONDITION}>
              <Form.Label>Condition</Form.Label>
              <Form.Control
                as="select"
                custom
                onChange={(e) => handleOnChange(e, AD_INPUTS.CONDITION)}
              >
                <option>Select Condition</option>
                <option>{CONDITION.NEW}</option>
                <option>{CONDITION.OLD}</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId={AD_INPUTS.PHOTO}>
              <Form.Label>Photo URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Photo URL"
                onChange={(e) => handleOnChange(e, AD_INPUTS.PHOTO)}
              />
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group controlId={AD_INPUTS.EMAIL}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Email"
                onChange={(e) => handleOnChange(e, AD_INPUTS.EMAIL)}
              />
            </Form.Group>
            <Form.Group controlId={AD_INPUTS.ZIP_CODE}>
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Zip Code"
                onChange={(e) => handleOnChange(e, AD_INPUTS.ZIP_CODE)}
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
