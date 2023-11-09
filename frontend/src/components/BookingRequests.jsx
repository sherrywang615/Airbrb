import React from 'react';
import ErrorModal from './ErrorModal';
import { useParams } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

// component for displaying all booking requests for a listing
function BookingRequests (props) {
  const { listingId } = useParams();
  const [bookingRequests, setBookingRequests] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [errorShow, setErrorShow] = React.useState(false);
  const handleErrorShow = () => setErrorShow(true);
  const handleErrorClose = () => setErrorShow(false);

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

  // Accept a booking for a bookingId
  const acceptBooking = async (bookingId) => {
    const res = await fetch(
      `http://localhost:5005/bookings/accept/${bookingId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${props.token}`,
        },
      }
    );
    const data = await res.json();
    if (data.error) {
      console.log(data.error);
      setErrorMessage(data.error);
      handleErrorShow();
    } else {
      // Update the booking status in the bookingRequests state
      const updatedBookingRequests = bookingRequests.map((booking) => {
        if (booking.id === bookingId) {
          return { ...booking, status: 'accepted' };
        } else {
          return booking;
        }
      });
      console.log('accepted');
      setBookingRequests(updatedBookingRequests);
    }
  };

  // Decline a booking for a bookingId
  const declineBooking = async (bookingId) => {
    const res = await fetch(
      `http://localhost:5005/bookings/decline/${bookingId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${props.token}`,
        },
      }
    );
    const data = await res.json();
    if (data.error) {
      console.log(data.error);
      setErrorMessage(data.error);
      handleErrorShow();
    } else {
      // Update the booking status in the bookingRequests state
      const updatedBookingRequests = bookingRequests.map((booking) => {
        if (booking.id === bookingId) {
          return { ...booking, status: 'declined' };
        } else {
          return booking;
        }
      });
      console.log('declined');
      setBookingRequests(updatedBookingRequests);
    }
  };

  // Get all bookings for the listing
  React.useEffect(() => {
    getAllBookings().then((bookings) => {
      // Filter the bookings by listingId
      const filteredBookings = bookings.filter(
        (booking) => booking.listingId === listingId
      );
      setBookingRequests(filteredBookings);
    });
  }, [listingId]);

  console.log(bookingRequests);

  return (
    <>
      <h2>Booking Requests</h2>
      <ListGroup as='ol' numbered className='w-50'>
        {bookingRequests.map((booking) => (
          <ListGroup.Item
            as='li'
            className='d-flex justify-content-between align-items-start'
            key={booking.id}>
            <div className='ms-2 me-auto'>
              <div className='fw-bold'>Booking Id: {booking.id}</div>
              {new Date(booking.dateRange.start).toLocaleDateString()} -{' '}
              {new Date(booking.dateRange.end).toLocaleDateString()}, $
              {booking.totalPrice} AUD total
              {booking.status === 'pending' && (
                <div>
                  <Button
                    variant='outline-success'
                    size='sm'
                    onClick={() => acceptBooking(booking.id)}>
                    Accept
                  </Button>{' '}
                  <Button
                    variant='outline-danger'
                    size='sm'
                    onClick={() => declineBooking(booking.id)}>
                    Decline
                  </Button>
                </div>
              )}
            </div>
            {/* chnage the color of the badge based on the booking status */}
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

      <ErrorModal
        errorMessage={errorMessage}
        show={errorShow}
        handleClose={handleErrorClose}
      />
    </>
  );
}

export default BookingRequests;
