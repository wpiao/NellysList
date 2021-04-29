import React from 'react';
import { Container, Col, Card, Form, Button, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
// import SpinnerWrapper from './SpinnerWrapper';
import { Map } from './Map';
import { useGetAd } from '../hooks/useGetAd';
import { useParams } from 'react-router-dom';
// import { useAlert } from 'react-alert';
// import { client } from '../components/V2App';
// import { gql } from '@apollo/client';

export const V2AdDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  // const alert = useAlert();

  // isLoadingAd, adError,
  const { ad, coordinates, isLoadingMap } = useGetAd(id, true);

  const handleEdit = () => {
    history.push(`/ad/${id}/edit`);
  };

  const handleDelete = async () => {
    // TODO: GraphQL Delete by ID
  };

  const renderMap = () => {
    if (isLoadingMap) {
      return (
        <div
          style={{
            height: 300,
            background: '#ededed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        ></div>
      );
    }

    if (coordinates && !isLoadingMap) {
      return <Map coordinates={coordinates} />;
    }

    if (!coordinates && !isLoadingMap) {
      return <div>No map data found</div>;
    }
  };

  return (
    <>
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
              {renderMap()}
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
