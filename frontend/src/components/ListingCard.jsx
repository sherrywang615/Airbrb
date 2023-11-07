import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function ListingCard (props) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant='top' src={props.thumbnail} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          {props.street} <br />
          {props.city}, {props.state}, {props.postcode}, {props.country}<br />
          ${props.price} /night <br />
          {props.bathrooms} baths, {props.bedrooms} bedrooms, {props.beds} beds <br />
          Amenities: {props.amenities} <br />
          {props.reviews.length} reviews
        </Card.Text>

        <Button variant='outline-primary' size='sm' onClick={props.handleEditShow}>
          Edit
        </Button>{' '}
        <Button variant='outline-danger' size='sm' onClick={props.handleDelete}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ListingCard;
