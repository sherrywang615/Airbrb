import React from 'react';
import CreateListingsModal from './CreateListingsModal';

function HostedListings (props) {
  return (
    <>
      <h2>Hosted Listings</h2>

      <CreateListingsModal token={props.token} />
    </>
  );
}

export default HostedListings;
