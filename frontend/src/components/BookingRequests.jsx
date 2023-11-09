import React from 'react';
import ErrorModal from './ErrorModal';
import { useParams } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

// component for displaying all booking requests for a listing
function BookingRequests (props) {
  const { listingId } = useParams();
  const currentDate = new Date();
  const [bookingRequests, setBookingRequests] = React.useState([]);
  const [listing, setListing] = React.useState({});
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

  // Get all bookings for the listing
  React.useEffect(() => {
    getAllBookings().then((bookings) => {
      // Filter the bookings by listingId
      const filteredBookings = bookings.filter(
        (booking) => booking.listingId === listingId
      );
      setBookingRequests(filteredBookings);
    });

    // Get the information for the listing
    getListing(listingId).then((listing) => {
      setListing(listing);
    });
  }, [listingId]);

  // Calculate the number of days between the given date and today
  const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const differenceTime = endDate - startDate;
    const differenceDays = Math.ceil(differenceTime / (1000 * 3600 * 24));
    return differenceDays;
  };

  // Calculate the number of days this year the listing has been booked for
  const calculateDaysBooked = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    let daysBookedThisYear = 0;
    bookingRequests.forEach((booking) => {
      if (booking.status === 'accepted') {
        const startDate = new Date(booking.dateRange.start);
        const endDate = new Date(booking.dateRange.end);
        if (startDate.getFullYear() === currentYear) {
          const daysBooked = calculateDays(startDate, endDate);
          daysBookedThisYear += daysBooked;
        }
      }
    });
    return daysBookedThisYear;
  };

  // Calculate the total profit
  const calculateTotalProfit = () => {
    let totalProfit = 0;
    bookingRequests.forEach((booking) => {
      if (booking.status === 'accepted') {
        totalProfit += booking.totalPrice;
      }
    });
    return totalProfit;
  };

  console.log(listing);

  return (
    <>
      <h2>Booking Requests & Listing History </h2>
      <p>
        {listing.postedOn
          ? `This listing has been up online for ${calculateDays(
              listing.postedOn,
              currentDate
            )} ${
              calculateDays(listing.postedOn, currentDate) > 1 ? 'days' : 'day'
            }.`
          : 'This listing is not published.'}
      </p>
      <p>
        It has been booked for {calculateDaysBooked()}{' '}
        {calculateDaysBooked() > 1 ? 'days' : 'day'} this year and your total
        profit is ${calculateTotalProfit()} AUD.
      </p>
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
