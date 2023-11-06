import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function ListingCard (props) {
  // const [value, setValue] = React.useState(1);
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant='top' src='holder.js/100px180' />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          {props.address}, ${props.price} /night <br />
          {props.bathrooms} baths, {props.bedrooms} bedrooms, {props.beds} beds <br />
          Amenities: {props.amenities} <br />
          {props.reviews.length} reviews
        </Card.Text>

        <Button variant='outline-light' size='sm' onClick={props.handleEdit}>
          Delete
        </Button>
        <Button variant='outline-danger' size='sm' onClick={props.handleDelete}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ListingCard;
