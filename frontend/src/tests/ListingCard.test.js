import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import HomeListingCard from '../components/HomeListingCard';

describe('HomeListingCard', () => {
  const props = {
    listingId: '1',
    title: 'Test Listing',
    street: 'Test St',
    city: 'Sydney',
    state: 'NSW',
    postcode: '2000',
    country: 'Australia',
    price: '99',
    thumbnail: '../dog.jpeg',
    reviews: [{ rating: 1, content: 'test content' }]
  };

  it('renders correctly', () => {
    render(
      <Router>
        <HomeListingCard {...props} />
      </Router>
    );

    expect(screen.getByText('Test Listing')).toBeInTheDocument();
    expect(screen.getByText(/Test St/)).toBeInTheDocument();
    expect(screen.getByText(/Sydney/)).toBeInTheDocument();
    expect(screen.getByText(/NSW/)).toBeInTheDocument();
    expect(screen.getByText(/Australia/)).toBeInTheDocument();
    expect(screen.getByText(/\$99 \/night/)).toBeInTheDocument();
    expect(screen.getByText(/1 review/)).toBeInTheDocument();
  });
});
