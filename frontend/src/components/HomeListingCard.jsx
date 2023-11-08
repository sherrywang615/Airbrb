import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function HomeListingCard (props) {
  console.log(props.listingId);
  return (
    <Link to={`/listing/${props.listingId}`}>
      <Card style={{ width: '18rem' }} id={props.listingId}>
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
    </Link>
  );
}
export default HomeListingCard;
