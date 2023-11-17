import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AvailabilityModal from '../components/AvailabilityModal';
import dayjs from 'dayjs';

describe('AvailabilityModal', () => {
  const handleClose = jest.fn();
  const dateRanges = [{ start: dayjs(), end: dayjs() }];
  const addDateRange = jest.fn();
  const handleAvailabilitySubmit = jest.fn();
  const handleDateChange = jest.fn();

  it('renders correctly', () => {
    render(
      <AvailabilityModal
        show={true}
        dateRanges={dateRanges}
        addDateRange={addDateRange}
        handleClose={handleClose}
        handleAvailabilitySubmit={handleAvailabilitySubmit}
        handleDateChange={handleDateChange}
      />
    );

    expect(screen.getByText('Select Availability:')).toBeInTheDocument();
    expect(screen.getAllByRole('textbox').length).toBe(2);
  });

  it('calls handleAvailabilitySubmit when the submit button is clicked', () => {
    render(
      <AvailabilityModal
        show={true}
        dateRanges={dateRanges}
        addDateRange={addDateRange}
        handleClose={handleClose}
        handleAvailabilitySubmit={handleAvailabilitySubmit}
        handleDateChange={handleDateChange}
      />);
    fireEvent.click(screen.getByText('Submit'));
    expect(handleAvailabilitySubmit).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Close'));
    expect(handleClose).toHaveBeenCalled();
  });
});
