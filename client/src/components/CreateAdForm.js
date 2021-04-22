import React, { useState, useEffect } from 'react';
import { Container, Col, Form, Button, Figure } from 'react-bootstrap';
import { CONDITION } from './Condition';
import { Upload } from './Upload';

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
  ZIP_CODE: '(^\\d{5}$)|(^\\d{9}$)|(^\\d{5}-\\d{4}$)',
};

export const CreateAdForm = ({ id, handleSubmit, currentAd }) => {
  const [ad, setAd] = useState({});
  const [validated, setValidated] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const handleSelectedFile = (file) => {
    setSelectedFile(file);
  };

  const handlePreviewSource = (previewSource) => {
    setPreviewSource(previewSource);
  };

  useEffect(() => {
    // TODO: if there is an ID, find ad by ID, then setAd with ad
    if (id) {
      setAd(currentAd);
    }
  }, [id, currentAd]);

  const handleOnChange = (e, adKey) => {
    const value =
      e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setAd({ ...ad, [adKey]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      handleSubmit(ad, previewSource);
    }
    setValidated(true);
  };

  return (
    <Container>
      <Form onSubmit={submit} noValidate validated={validated}>
        <Form.Row>
          <Col xs={4}>
            {previewSource ? (
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
            )}
          </Col>
          <Col xs={4}>
            <Form.Group controlId={AD_INPUTS.TITLE} className="required">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Title"
                onChange={(e) => handleOnChange(e, AD_INPUTS.TITLE)}
                defaultValue={ad.title}
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
                defaultValue={ad.description}
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
                defaultValue={ad.price}
              />
            </Form.Group>
            <Form.Group controlId={AD_INPUTS.CONDITION}>
              <Form.Label>Condition</Form.Label>
              <Form.Control
                as="select"
                custom
                onChange={(e) => handleOnChange(e, AD_INPUTS.CONDITION)}
                defaultValue={ad.condition}
              >
                <option>{CONDITION.OLD}</option>
                <option>{CONDITION.NEW}</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId={AD_INPUTS.PHOTO}>
              <Form.Label>Photo Upload</Form.Label>
              <Upload
                selectedFile={selectedFile}
                setSelectedFile={handleSelectedFile}
                setPreviewSource={handlePreviewSource}
              />
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group controlId={AD_INPUTS.EMAIL} className="required">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter Email"
                onChange={(e) => handleOnChange(e, AD_INPUTS.EMAIL)}
                defaultValue={ad.email}
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
                defaultValue={ad.zipCode}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a zip code.
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              {id ? 'Update' : 'Create'}
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </Container>
  );
};
