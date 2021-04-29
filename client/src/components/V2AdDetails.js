import React, { useState } from 'react';
import { Container, Col, Card, Form, Button, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import SpinnerWrapper from './SpinnerWrapper';
import { Map } from './Map';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_AD_BY_ID } from '../GraphQL/queries';
import { useAlert } from 'react-alert';
import { getLatLngByZipCode } from '../api/apiUtils';

export const V2AdDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const alert = useAlert();
  const [isLoadingMap, setLoadingMap] = useState(false);
  const [coordinates, setCoordinates] = useState(null);

  const getMapData = async (zipCode) => {
    setLoadingMap(true);
    try {
      const res = await getLatLngByZipCode(zipCode);
      if (res?.results?.length) {
        setCoordinates({
          lat: res.results[0]?.geometry?.location?.lat,
          lng: res.results[0]?.geometry?.location?.lng,
        });
      }
    } catch (error) {
      console.error(error);
    }
    setLoadingMap(false);
  };

  const { loading, error, data } = useQuery(GET_AD_BY_ID, {
    variables: { id },
    onCompleted: async (data) => {
      if (data?.ad?.zipCode) {
        await getMapData(data.ad.zipCode);
      }
    },
  });

  const handleEdit = () => {
    if (data?.ad?.id) {
      history.push(`/ad/${data.ad.id}/edit`);
    }
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

  if (loading) {
    return <SpinnerWrapper isLoading={loading} />;
  }

  if (error) {
    alert.show('Something Went Wrong!', { type: 'error' });
  }

  return (
    <>
      {data?.ad && (
        <Container className="mb-5">
          {/* TODO: spinner for waiting on DELETE */}
          {/* <SpinnerWrapper isLoadingDELETE={isLoadingDELETE} /> */}
          <Row>
            <Col xs={6}>
              <Card>
                <Card.Img variant="top" src={data.ad.photo} />
                <Card.Body>
                  <Card.Title style={{ textAlign: 'center' }}>
                    {data.ad.title} ({data.ad.condition})
                  </Card.Title>
                  <Card.Text style={{ textAlign: 'center' }}>
                    $ {data.ad.price}
                  </Card.Text>
                  <Card.Text style={{ textAlign: 'center' }}>
                    {data.ad.description}
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
                    value={data.ad.email}
                    disabled
                  ></Form.Control>
                  <br />
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control
                    type="text"
                    value={data.ad.zipCode}
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
