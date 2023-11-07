import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function AvailabilityModal (props) {
  return (
    <Modal
      show={props.show}
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header>
        <Modal.Title>Select Availability:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangeCalendar
            value={props.availability}
            onChange={(newValue) => props.setAvailability(newValue)}
          />
        </LocalizationProvider>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={props.handleClose}>
          Close
        </Button>
        <Button type='submit' onClick={props.handleAvailabilitySubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AvailabilityModal;
