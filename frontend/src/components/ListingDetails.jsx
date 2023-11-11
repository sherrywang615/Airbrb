import React from 'react';
import ErrorModal from './ErrorModal';
import { useParams } from 'react-router-dom';
import BookingModal from './BookingModal';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Review from './Review';
import Rating from '@mui/material/Rating';

// Listing details component
function ListingDetails (props) {
  const { id } = useParams();
  const [listing, setListing] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [errorShow, setErrorShow] = React.useState(false);
  const [bookings, setBookings] = React.useState([]);
  const [reviewShow, setReviewShow] = React.useState(false);
  const [reviewSubmittedShow, setReviewSubmittedShow] = React.useState(false);
  const handleErrorShow = () => setErrorShow(true);
  const handleErrorClose = () => setErrorShow(false);
  const [bookingShow, setBookingShow] = React.useState(false);
  const handleBookingShow = () => setBookingShow(true);
  const handleReviewClose = () => setReviewShow(false);
  const handleReviewShow = () => setReviewShow(true);
  const handleBookingClose = () => {
    setBookingShow(false);
    const savedBookingIds = JSON.parse(
      localStorage.getItem(`bookingIds/${props.email}`)
    );
    getAllBookings().then((bookings) => {
      if (savedBookingIds) {
        const filteredBookings = bookings
          .filter((booking) => booking.listingId.toString() === id)
          .filter((booking) => savedBookingIds.includes(booking.id.toString()));
        setBookings(filteredBookings);
      }
    });
  };
  const handleReviewSubmittedClose = () => {
    setReviewSubmittedShow(false);
  };

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

  // call the api to get all bookings
  const getAllBookings = async () => {
    const res = await fetch('http://localhost:5005/bookings', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${props.token}`,
      },
    });
    const data = await res.json();
    if (data.error) {
      console.log(data.error);
      setErrorMessage(data.error);
      handleErrorShow();
    } else {
      return data.bookings;
    }
  };

  // Call getListing() and set listing when id or reviewSubmittedShow changes
  React.useEffect(() => {
    getListing(id).then((listing) => {
      setListing(listing);
    });
    const savedBookingIds = JSON.parse(
      localStorage.getItem(`bookingIds/${props.email}`)
    );

    getAllBookings().then((bookings) => {
      if (savedBookingIds) {
        const filteredBookings = bookings
          .filter((booking) => booking.listingId.toString() === id)
          .filter((booking) => savedBookingIds.includes(booking.id.toString()));
        setBookings(filteredBookings);
      }
    });
  }, [id, reviewSubmittedShow]);

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
          <h5>Reviews:</h5>
          <ListGroup className='w-50'>
            {listing && listing.reviews && listing.reviews.length > 0
              ? (
                  listing.reviews.map((review, index) => (
                <>
                  <ListGroup.Item key={index}>
                    <Rating name='read-only' value={review.rating} readOnly />{' '}
                    {review.rating} <br />
                    {review.comments}
                  </ListGroup.Item>
                </>
                  ))
                )
              : (
              <p>No reviews</p>
                )}
          </ListGroup>
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
            email={props.email}
          />
        </>
          )
        : (
        <div>Loading...</div>
          )}

      <h5>Your Booking Status:</h5>
      <ListGroup as='ol' numbered className='w-50'>
        {bookings.map((booking) => (
          <ListGroup.Item
            as='li'
            className='d-flex justify-content-between align-items-start'
            key={booking.id}>
            <div className='ms-2 me-auto'>
              <div>Booking Id: {booking.id}</div>
              {new Date(booking.dateRange.start).toLocaleDateString()} -{' '}
              {new Date(booking.dateRange.end).toLocaleDateString()}, $
              {booking.totalPrice} AUD total
            </div>
            <span
              className={`badge ${
                booking.status === 'pending'
                  ? 'bg-warning'
                  : booking.status === 'declined'
                  ? 'bg-danger'
                  : booking.status === 'accepted'
                  ? 'bg-success'
                  : 'bg-primary'
              } rounded-pill`}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {bookings.some((booking) => booking.status === 'accepted') && (
        <>
          <Button variant='info' onClick={handleReviewShow}>
            Leave a review
          </Button>
          <Review
            show={reviewShow}
            token={props.token}
            email={props.email}
            handleClose={handleReviewClose}
            bookingId={
              bookings.find((booking) => booking.status === 'accepted').id
            }
            listingId={id}
            reviewSubmittedShow={reviewSubmittedShow}
            handleReviewSubmittedClose={handleReviewSubmittedClose}
            setReviewSubmittedShow={setReviewSubmittedShow}
          />
        </>
      )}

      <ErrorModal
        errorMessage={errorMessage}
        show={errorShow}
        handleClose={handleErrorClose}
      />
    </>
  );
}

export default ListingDetails;
