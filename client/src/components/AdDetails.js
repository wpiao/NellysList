import React, { useState, useEffect } from 'react';
import { Container, Col, Card, Form, Button, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { deleteAd, getAds } from '../api/apiUtils';
import { useAlert } from 'react-alert';
import SpinnerWrapper from './SpinnerWrapper';

export const AdDetails = ({ ad, setCurrentAd, updateAds }) => {
  const [isLoadingDELETE, setLoadingDELETE] = useState(false);
  const history = useHistory();
  const alert = useAlert();

  useEffect(() => {
    if (Object.keys(ad).length === 0) {
      history.push('/');
    }
  }, [ad, history]);

  const handleEdit = () => {
    history.push(`/ad/${ad.id}/edit`);
    setCurrentAd(ad);
  };

  const handleDelete = async () => {
    setLoadingDELETE(true);
    try {
      await deleteAd(ad.id);
      const res = await getAds();
      alert.show('Successfully Deleted!', { type: 'success' });
      updateAds(res);
    } catch (error) {
      alert.show('Something Went Wrong!', { type: 'error' });
      console.log(error);
    }
    setLoadingDELETE(false);
    history.push('/');
  };

  return (
    <Container>
      <SpinnerWrapper isLoading={isLoadingDELETE} />
      <Row>
        <Col xs={6}>
          <Card>
            <Card.Img variant="top" src={ad.photo} />
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
          <Button variant="danger" size="lg" onClick={handleDelete}>
            Delete
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
