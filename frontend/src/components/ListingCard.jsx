import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';

// Listing card on the hosted listings page
function ListingCard (props) {
  // Calculate the average rating for a listing
  const rating = props.reviews.reduce((acc, review) => {
    return acc + review.rating;
  }
  , 0);
  const avgRating = rating / props.reviews.length;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant='top' src={props.thumbnail} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          {props.type} in {props.street}, {props.city}, {props.state},{' '}
          {props.postcode}, {props.country}
          <br />${props.price} /night <br />
          {props.bathrooms} {props.bathrooms > 1 ? 'baths' : 'bath'},{' '}
          {props.bedrooms} {props.bedrooms > 1 ? 'beds' : 'bed'}, {props.beds}{' '}
          {props.beds > 1 ? 'beds' : 'bed'} <br />
          {props.amenities} <br />
          {props.reviews.length} reviews <br />
          <Rating name='read-only' value={avgRating} precision={0.5} readOnly />
        </Card.Text>
        <>
          <div>
            {props.published
              ? (
              <Button
                variant='outline-danger'
                name='unpublish'
                size='sm'
                onClick={props.handleUnpublishClick}>
                Unpublish
              </Button>
                )
              : (
              <Button
                variant='outline-info'
                name='publish'
                size='sm'
                onClick={props.handleAvailabilityShow}>
                Publish
              </Button>
                )}{' '}
            <Link to={`/listing/${props.listingId}/bookings`}>
              <Button variant='outline-info' size='sm'>
                Manage bookings
              </Button>{' '}
            </Link>
          </div>
          <div>
            <Button
              variant='outline-primary'
              size='sm'
              onClick={props.handleEditShow}
              name='edit-listing'>
              Edit
            </Button>{' '}
            <Button
              variant='outline-danger'
              size='sm'
              onClick={props.handleDelete}>
              Delete
            </Button>
          </div>
        </>
      </Card.Body>
    </Card>
  );
}

export default ListingCard;
