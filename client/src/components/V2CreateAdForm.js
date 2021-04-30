import React, { useState, useEffect, useContext } from 'react';
import { Container, Col, Form, Button } from 'react-bootstrap';
import { CONDITION } from './Condition';
import { Upload } from './Upload';
import SpinnerWrapper from './SpinnerWrapper';
import { AdFormInputGroup } from './AdFormInputGroup';
import { ImagePreview } from './ImagePreview';
import { useHistory } from 'react-router-dom';
import { useGetAd } from '../hooks/useGetAd';
import { AdsContext } from '../contexts/AdsContext';

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

const INITIAL_AD_STATE = {
  id: null,
  title: null,
  price: null,
  description: null,
  photo: null,
  condition: CONDITION.OLD,
  email: null,
  zipCode: null,
};

export const V2CreateAdForm = ({ id, handleSubmit }) => {
  const [ad, setAd] = useState(INITIAL_AD_STATE);
  const [validated, setValidated] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const history = useHistory();
  const [adsState] = useContext(AdsContext);
  const {
    ad: adResponse,
    isLoadingCreate,
    isLoadingUpdate,
    isLoadingAd,
  } = adsState;

  useGetAd(id, false);

  useEffect(() => {
    if (id && adResponse) {
      setAd(adResponse);
      setPreviewSource(adResponse.photo);
    }
  }, [id, adResponse]);

  const handleSelectedFile = (file) => {
    setSelectedFile(file);
  };

  const handlePreviewSource = (previewSource) => {
    setPreviewSource(previewSource);
  };

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
      handleSubmit(ad, previewSource, selectedFile);
    }
    setValidated(true);
  };

  const handleCancel = () => {
    history.push(`/ad/${id}`);
  };

  if (isLoadingCreate || isLoadingUpdate || isLoadingAd) {
    return <SpinnerWrapper isLoading={true} />;
  }

  return (
    <Container>
      <Form onSubmit={submit} noValidate validated={validated}>
        <Form.Row>
          <Col xs={4}>
            <ImagePreview previewSource={previewSource} />
          </Col>
          <Col xs={4}>
            <AdFormInputGroup
              title={AD_INPUTS.TITLE}
              required={true}
              placeholder="Enter Title"
              invalidFeedback="Please enter a title."
              handleOnChange={handleOnChange}
              defaultValue={ad.title}
            />
            <AdFormInputGroup
              title={AD_INPUTS.DESCRIPTION}
              required={true}
              placeholder="Enter Description"
              invalidFeedback="Please enter a description."
              handleOnChange={handleOnChange}
              defaultValue={ad.description}
            />
            <AdFormInputGroup
              title={AD_INPUTS.PRICE}
              required={false}
              placeholder="Enter Price"
              handleOnChange={handleOnChange}
              defaultValue={ad.price}
            />
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
            <AdFormInputGroup
              title={AD_INPUTS.EMAIL}
              required={true}
              placeholder="Enter Email"
              invalidFeedback="Please enter a valid email."
              handleOnChange={handleOnChange}
              defaultValue={ad.email}
            />
            <AdFormInputGroup
              title={AD_INPUTS.ZIP_CODE}
              required={true}
              pattern={REGEX.ZIP_CODE}
              placeholder="Enter Zip Code"
              invalidFeedback=" Please enter a valid zip code."
              handleOnChange={handleOnChange}
              defaultValue={ad.zipCode}
            />
            <Button variant="primary" type="submit">
              {id ? 'Update' : 'Create'}
            </Button>
            {id && (
              <Button variant="info" className="ml-1" onClick={handleCancel}>
                Cancel
              </Button>
            )}
          </Col>
        </Form.Row>
      </Form>
    </Container>
  );
};
