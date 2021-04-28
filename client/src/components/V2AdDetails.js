import React from 'react';
import { Container, Col, Card, Form, Button, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import SpinnerWrapper from './SpinnerWrapper';
import { Map } from './Map';
import { useGetAd } from '../hooks/useGetAd';
import { useParams } from 'react-router-dom';

export const V2AdDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const { ad, coordinates, isLoadingAd, adError } = useGetAd(id, true);

  const handleEdit = () => {
    history.push(`/ad/${ad.id}/edit`);
  };

  const handleDelete = async () => {
    // TODO: GraphQL Delete by ID
  };

  return (
    <>
      {isLoadingAd && <SpinnerWrapper isLoading={isLoadingAd} />}
      {adError && <Container>Error Retrieving Data</Container>}
      {ad && (
        <Container className="mb-5">
          {/* TODO: spinner for waiting on DELETE */}
          {/* <SpinnerWrapper isLoadingDELETE={isLoadingDELETE} /> */}
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
              {coordinates ? (
                <Map coordinates={coordinates} />
              ) : (
                <div>No map data found</div>
              )}
              <Form className="mt-3">
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
      )}
    </>
  );
};
