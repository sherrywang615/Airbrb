import React from 'react';
import Card from 'react-bootstrap/Card';

function HomeListingCard (props) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant='top' src={props.thumbnail} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          {props.street} <br />
          {props.city}, {props.state}, {props.postcode}, {props.country}
          <br />${props.price} /night <br />
          {props.reviews.length} reviews <br />
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
export default HomeListingCard;
