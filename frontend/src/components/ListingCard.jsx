import React from 'react';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

// Listing card on the hosted listings page
function ListingCard (props) {
  // Calculate the average rating for a listing
  const rating = props.reviews.reduce((acc, review) => {
    return acc + review.rating;
  }, 0);
  const avgRating = rating / props.reviews.length;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component='img'
          height='230'
          image={props.thumbnail}
          alt='thumbnail'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {props.title}
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            {props.type} in {props.street}, {props.city}, {props.state},{' '}
            {props.postcode}, {props.country}
            <br />${props.price} /night <br />
            {props.bathrooms} {props.bathrooms > 1 ? 'baths' : 'bath'},{' '}
            {props.bedrooms} {props.bedrooms > 1 ? 'beds' : 'bed'}, {props.beds}{' '}
            {props.beds > 1 ? 'beds' : 'bed'} <br />
            {props.amenities} <br />
            {props.reviews.length} reviews <br />
            <Rating
              name='read-only'
              value={avgRating}
              precision={0.5}
              readOnly
            />
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <>
          <div>
            {props.published
              ? (
              <Button
                color='error'
                name='unpublish'
                size='sm'
                onClick={props.handleUnpublishClick}>
                Unpublish
              </Button>
                )
              : (
              <Button
                color='primary'
                name='publish'
                size='sm'
                onClick={props.handleAvailabilityShow}>
                Publish
              </Button>
                )}{' '}
            <Link to={`/listing/${props.listingId}/bookings`}>
              <Button color='secondary' size='sm'>
                Manage bookings
              </Button>{' '}
            </Link>
          </div>
          <div>
            <Button
              color='primary'
              size='sm'
              onClick={props.handleEditShow}
              name='edit-listing'>
              Edit
            </Button>{' '}
            <Button
              color='error'
              size='sm'
              onClick={props.handleDelete}>
              Delete
            </Button>
          </div>
        </>
      </CardActions>
    </Card>
  );
}

export default ListingCard;
