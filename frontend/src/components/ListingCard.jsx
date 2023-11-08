import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from '@mui/material/Rating';

function ListingCard (props) {
  // const rating = props.reviews.reduce((acc, review) => {
  //   return acc + review.rating;
  // }
  // , 0);

  // const avgRating = rating / props.reviews.length;
  const avgRating = 2.3;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant='top' src={props.thumbnail} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          {props.street} <br />
          {props.city}, {props.state}, {props.postcode}, {props.country}
          <br />${props.price} /night <br />
          {props.bathrooms} baths, {props.bedrooms} bedrooms, {props.beds} beds{' '}
          <br />
          Amenities: {props.amenities} <br />
          {props.reviews.length} reviews <br />
          <Rating name='read-only' value={avgRating} precision={0.5} readOnly />
        </Card.Text>
        {props.published
          ? (
          <Button
            variant='outline-danger'
            size='sm'
            onClick={props.handleUnpublishClick}>
            Unpublish
          </Button>
            )
          : (
          <Button
            variant='outline-info'
            size='sm'
            onClick={props.handleAvailabilityShow}>
            Publish
          </Button>
            )}
        <Button
          variant='outline-primary'
          size='sm'
          onClick={props.handleEditShow}>
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
