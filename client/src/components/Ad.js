import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export const Ad = ({ ad, setAd }) => {
  let history = useHistory();

  const handleClick = () => {
    history.push(`/ad/${ad.id}`);
    setAd(ad);
  }
  return (
    <>
      <Card style={{ width: '18rem' }} onClick={handleClick} >
        <Card.Img variant="top" src={ad.photo} style={{ height: 300 }} />
        <Card.Body>
          <Card.Title style={{ textAlign: 'center' }}>{ad.title}</Card.Title>
          <Card.Text style={{ textAlign: 'center' }}>${ad.price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
