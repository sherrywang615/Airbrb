import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ErrorModal from './ErrorModal';

// Modal for booking a listing
function BookingModal (props) {
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [bookingConfirmation, setBookingConfirmation] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [errorShow, setErrorShow] = React.useState(false);
  const handleErrorShow = () => setErrorShow(true);
  const handleErrorClose = () => setErrorShow(false);

  // Call the api to make a booking, return the booking id
  const makeBooking = async (listingId) => {
    const dateRange = {
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    };
    const start = new Date(dateRange.start);
    const end = new Date(dateRange.end);
    const nights = end.getDate() - start.getDate();
    const res = await fetch(`http://localhost:5005/bookings/new/${listingId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({
        dateRange,
        totalPrice: props.price * nights,
      }),
    });
    const data = await res.json();
    if (data.error) {
      console.log(data.error);
      setErrorMessage(data.error);
      handleErrorShow();
    } else {
      console.log('Booking confirmed');
      setBookingConfirmation(true);
      return data.bookingId;
    }
  };

  return (
    <>
      <Modal
        show={props.show}
        aria-labelledby='contained-modal-title-vcenter'
        centered>
        <Modal.Header>
          <Modal.Title>Select start and end dates:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Row>
              <Col>
                <DatePicker
                  label='Start Date'
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </Col>
              <Col>
                <DatePicker
                  label='End Date'
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                />
              </Col>
            </Row>
          </LocalizationProvider>
          {bookingConfirmation && <p>Booking Confirmed!</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={props.handleBookingClose}>
            Close
          </Button>
          <Button type='submit' onClick={() => makeBooking(props.listingId)}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <ErrorModal
        errorMessage={errorMessage}
        show={errorShow}
        handleClose={handleErrorClose}
      />
    </>
  );
}
export default BookingModal;
