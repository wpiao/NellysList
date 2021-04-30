import React, { useContext } from 'react';
import { Container, Col, Card, Form, Button, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import SpinnerWrapper from './SpinnerWrapper';
import { Map } from './Map';
import { useGetAd } from '../hooks/useGetAd';
import { useParams } from 'react-router-dom';
import { ACTIONS, AdsContext } from '../contexts/AdsContext';
import { client } from '../components/V2App';
import { useAlert } from 'react-alert';
import { GET_ADS } from '../GraphQL/queries';
import { DELETE_AD } from '../GraphQL/mutations';

export const V2AdDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const { coordinates, isLoadingMap } = useGetAd(id, true);
  const [adsState, dispatch] = useContext(AdsContext);
  const { ad, isLoadingAd, ads, isLoadingDelete } = adsState;
  const alert = useAlert();

  const handleEdit = () => {
    history.push(`/ad/${id}/edit`);
  };

  const handleDelete = async () => {
    dispatch({ type: ACTIONS.LOAD_DELETE_AD });
    try {
      const mutationRes = await client.mutate({
        mutation: DELETE_AD,
        variables: { id },
      });

      const res = await client.query({
        query: GET_ADS,
        fetchPolicy: 'no-cache',
      });

      if (res.loading) {
        dispatch({ type: ACTIONS.LOAD_ADS });
      }

      dispatch({
        type: ACTIONS.GET_ADS,
        payload: { ads: res?.data?.ads || ads },
      });

      if (mutationRes?.data?.deleteAd) {
        alert.show('Successfully Deleted!', { type: 'success' });
      }

      dispatch({ type: ACTIONS.UNLOAD_DELETE_AD });
    } catch (error) {
      alert.show('Something Went Wrong!', { type: 'error' });
      dispatch({ type: ACTIONS.UNLOAD_DELETE_AD });
    }
    history.push('/');
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

  if (isLoadingAd || isLoadingDelete) {
    return <SpinnerWrapper isLoading={true} />;
  }
  return (
    <>
      {!isLoadingAd && ad && (
        <Container className="mb-5">
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
