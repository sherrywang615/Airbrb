import React from 'react';
import ErrorModal from './ErrorModal';
import { useParams } from 'react-router-dom';
import BookingModal from './BookingModal';
import Button from 'react-bootstrap/Button';

// Listing details component
function ListingDetails (props) {
  const { id } = useParams();
  const [listing, setListing] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [errorShow, setErrorShow] = React.useState(false);
  const handleErrorShow = () => setErrorShow(true);
  const handleErrorClose = () => setErrorShow(false);
  const [bookingShow, setBookingShow] = React.useState(false);
  const handleBookingShow = () => setBookingShow(true);
  const handleBookingClose = () => setBookingShow(false);
  const [bookingIds, setBookingIds] = React.useState([]);
  const savedBookingIds = JSON.parse(
    localStorage.getItem(`bookingIds/${props.token}`)
  );

  // Call the api to get a listing
  const getListing = async (listingId) => {
    const res = await fetch(`http://localhost:5005/listings/${listingId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    if (data.error) {
      console.log(data.error);
      setErrorMessage(data.error);
      handleErrorShow();
    } else {
      data.listing.id = listingId;
      return data.listing;
    }
  };

  // Call getListing() and set listing when component mounts
  React.useEffect(() => {
    getListing(id).then((listing) => {
      setListing(listing);
    });
    if (savedBookingIds) {
      setBookingIds(savedBookingIds);
    }
  }, [id]);

  console.log(savedBookingIds);
  console.log(bookingIds);

  return (
    <>
      {listing
        ? (
        <>
          <h1>{listing.title}</h1>
          <h4>
            {listing.metadata.type} in {listing.address.street},{' '}
            {listing.address.city}, {listing.address.state},{' '}
            {listing.address.country}, {listing.address.postcode}
          </h4>
          <h5>${listing.price} AUD/night</h5>
          <p>
            {listing.metadata.bedrooms}{' '}
            {listing.metadata.bedrooms > 1 ? 'bedrooms' : 'bedroom'},{' '}
            {listing.metadata.beds} {listing.metadata.beds > 1 ? 'beds' : 'bed'}
            , {listing.metadata.bathrooms}{' '}
            {listing.metadata.bathrooms > 1 ? 'baths' : 'bath'}
          </p>
          <p>Amenities: {listing.metadata.amenities}</p>
          <h5>⭐️</h5>
          <h5>Reviews:</h5>
          {listing && listing.reviews && listing.reviews.length > 0
            ? (
                listing.reviews.map((review) => (
              <p key={review.id}>{review.content}</p>
                ))
              )
            : (
            <p>No reviews</p>
              )}
          {props.token !== null && (
            <Button variant='primary' onClick={handleBookingShow}>
              Make a booking
            </Button>
          )}
          <BookingModal
            token={props.token}
            show={bookingShow}
            handleBookingClose={handleBookingClose}
            listingId={id}
            price={listing.price}
          />
        </>
          )
        : (
        <div>Loading...</div>
          )}

      <h5>Your Booking Status:</h5>
      {bookingIds.map((bookingId) => (
        <p key={bookingId}>{bookingId}</p>
      ))}

      <ErrorModal
        errorMessage={errorMessage}
        show={errorShow}
        handleClose={handleErrorClose}
      />
    </>
  );
}

export default ListingDetails;
