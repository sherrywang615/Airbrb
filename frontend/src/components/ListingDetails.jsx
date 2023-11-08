import React from 'react';
import ErrorModal from './ErrorModal';
import { useParams } from 'react-router-dom';

function ListingDetails (props) {
  const { id } = useParams();
  const [listing, setListing] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [errorShow, setErrorShow] = React.useState(false);
  const handleErrorShow = () => setErrorShow(true);
  const handleErrorClose = () => setErrorShow(false);

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

  React.useEffect(() => {
    getListing(id).then((listing) => {
      setListing(listing);
    });
  }, [id]);

  return (
    <>
      <h1>{listing.title}</h1>
      <h4>
        in {listing.address.street}, {listing.address.city},{' '}
        {listing.address.state}, {listing.address.country},{' '}
        {listing.address.postcode}
      </h4>
      <h5>${listing.price} AUD/night</h5>
      <p>
        {listing.metadata.bedrooms}{' '}
        {listing.metadata.bedrooms > 1 ? 'bedrooms' : 'bedroom'},{' '}
        {listing.metadata.beds} {listing.metadata.beds > 1 ? 'beds' : 'bed'},{' '}
        {listing.metadata.bathrooms}{' '}
        {listing.metadata.bathrooms > 1 ? 'baths' : 'bath'}
      </p>

      <ErrorModal
        errorMessage={errorMessage}
        show={errorShow}
        handleClose={handleErrorClose}
      />
    </>
  );
}

export default ListingDetails;
