import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from '../components/Register';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Register', () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ token: 'token' }),
    })
  );

  beforeEach(() => {
    fetch.mockClear();
  });

  it('successfully registers', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ token: 'token' }),
      })
    );

    const setToken = jest.fn();
    const setEmail = jest.fn();

    render(
      <Router>
        <Register setToken={setToken} setEmail={setEmail} />
      </Router>
    );

    // fill in the form
    fireEvent.change(screen.getByLabelText('Email:'), {
      target: { value: 'test@unsw.com' },
    });
    fireEvent.change(screen.getByLabelText('Name:'), {
      target: { value: 'Test name' },
    });
    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: 'test123' },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password:'), {
      target: { value: 'test123' },
    });

    // click register button and check if fetch is called
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      expect(setToken).toHaveBeenCalledWith('token');
      expect(setEmail).toHaveBeenCalledWith('test@unsw.com');
    });
  });
});
