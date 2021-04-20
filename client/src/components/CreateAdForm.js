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

const REGEX = {
  PHOTO: '^(https?:\\/\\/.*\\.(?:jpg|jpeg|gif|png))$',
  ZIP_CODE: '(^\\d{5}$)|(^\\d{9}$)|(^\\d{5}-\\d{4}$)',
};

export const CreateAdForm = ({ id, handleSubmit }) => {
  const [ad, setAd] = useState({});
  const [validated, setValidated] = useState(false);

  const handleOnChange = (e, adKey) => {
    const value =
      e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setAd({ ...ad, [adKey]: value });
  };

  const submit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      handleSubmit(ad, e);
    }
    setValidated(true);
  };

  return (
    <Container>
      <Form onSubmit={submit} noValidate validated={validated}>
        <Form.Row>
          <Col xs={6}>
            <Form.Group controlId={AD_INPUTS.TITLE} className="required">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Title"
                onChange={(e) => handleOnChange(e, AD_INPUTS.TITLE)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a title.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId={AD_INPUTS.DESCRIPTION} className="required">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                placeholder="Enter Description"
                onChange={(e) => handleOnChange(e, AD_INPUTS.DESCRIPTION)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a description.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId={AD_INPUTS.PRICE}>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                onChange={(e) => handleOnChange(e, AD_INPUTS.PRICE)}
                onKeyPress={(e) => e.charCode === 46 && e.preventDefault()}
              />
            </Form.Group>
            <Form.Group controlId={AD_INPUTS.CONDITION}>
              <Form.Label>Condition</Form.Label>
              <Form.Control
                as="select"
                custom
                onChange={(e) => handleOnChange(e, AD_INPUTS.CONDITION)}
              >
                <option>{CONDITION.OLD}</option>
                <option>{CONDITION.NEW}</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId={AD_INPUTS.PHOTO}>
              <Form.Label>Photo URL</Form.Label>
              <Form.Control
                pattern={REGEX.PHOTO}
                type="text"
                placeholder="http://"
                onChange={(e) => handleOnChange(e, AD_INPUTS.PHOTO)}
              />
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group controlId={AD_INPUTS.EMAIL} className="required">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter Email"
                onChange={(e) => handleOnChange(e, AD_INPUTS.EMAIL)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId={AD_INPUTS.ZIP_CODE} className="required">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                required
                pattern={REGEX.ZIP_CODE}
                type="text"
                placeholder="Enter Zip Code"
                onChange={(e) => handleOnChange(e, AD_INPUTS.ZIP_CODE)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a zip code.
              </Form.Control.Feedback>
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
