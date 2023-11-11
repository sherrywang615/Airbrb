import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// Modal for selecting availability when publish a listing
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
        <DatePicker
          label="Start Date"
          value={props.startDate}
          onChange={(newValue) => props.setStartDate(newValue)}
        />
        <DatePicker
          label="End Date"
          value={props.endDate}
          onChange={(newValue) => props.setEndDate(newValue)}
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
