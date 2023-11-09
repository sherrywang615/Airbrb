import React from 'react';
import CreateListingsModal from './CreateListingsModal';
// import { Link } from 'react-router-dom';

function HostedListings (props) {
  return (
    <>
      <h2>Hosted Listings</h2>
      {/* <Link to={`/bookings/${listing.id}/`}>View Booking Requests</Link> */}
      <CreateListingsModal token={props.token} />
    </>
  );
}

export default HostedListings;
