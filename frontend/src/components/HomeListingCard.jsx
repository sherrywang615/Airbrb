import React from 'react';
// import Card from 'react-bootstrap/Card';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function HomeListingCard (props) {
  return (
  <Link to={`/listing/${props.listingId}`}>
    <Card sx={{ maxWidth: 345 }}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="230"
        image={props.thumbnail}
        alt="thumbnail"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {props.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
        {props.street}{' '},{props.city}{' '}, {props.state},{' '}
           {props.postcode}, {props.country}
           <br />${props.price} /night <br />
           {props.reviews.length} {props.reviews.length > 1 ? 'reviews' : 'review'} <br />
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
  </Link>
  );
}
export default HomeListingCard;
