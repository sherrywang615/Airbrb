import React from 'react';
import CreateListingsModal from './CreateListingsModal';
// import ListingCard from './ListingCard';

function HostedListings (props) {
  //   const [listings, setListings] = React.useState([]);
  //   const [listing, setListing] = React.useState({});
  //   ƒ

  //   const getListing = (listingId) => {
  //     fetch(`http://localhost:5005/listings/${listingId}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.error) {
  //           console.log(data.error);
  //           // setErrorMessage(data.error);
  //           // handleShow();
  //         } else {
  //           setListing(data);
  //           setListings([...listings, data]);
  //         }
  //       });
  //   };

  //   React.useEffect(() => {
  //     getListings();
  //   }, []);

  return (
    <>
      <h2>Hosted Listings</h2>

      <CreateListingsModal token={props.token} />
    </>
  );
}

export default HostedListings;
