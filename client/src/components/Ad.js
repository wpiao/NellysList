import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './Ad.css';

export const Ad = ({ ad, setAd }) => {
  let history = useHistory();

  const handleClick = () => {
    history.push(`/ad/${ad.id}`);
    setAd(ad);
  };

  return (
    <>
      <Card onClick={handleClick} className="Ad">
        <Card.Img variant="top" src={ad.photo} />
        <Card.Body>
          <Card.Title style={{ textAlign: 'center' }}>{ad.title}</Card.Title>
          <Card.Text style={{ textAlign: 'center' }}>${ad.price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};
