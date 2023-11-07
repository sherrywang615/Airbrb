import React from 'react';
import ErrorModal from './ErrorModal';
import HomeListingCard from './HomeListingCard';

function Home (props) {
  const token = props.token;
  const [listings, setListings] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [errorShow, setErrorShow] = React.useState(false);
  const handleErrorShow = () => setErrorShow(true);
  const handleErrorClose = () => setErrorShow(false);

  // Call api to get all listings
  const getAllListings = async () => {
    const res = await fetch('http://localhost:5005/listings', {
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
      const publishedListingIds = localStorage.getItem('publishedListingIds');
      if (publishedListingIds) {
        const publishedListingIdsArr = JSON.parse(publishedListingIds);
        const filteredListings = data.listings.filter((listing) =>
          publishedListingIdsArr.includes(listing.id.toString())
        );
        setListings(filteredListings);
      }
    }
  };

  React.useEffect(() => {
    getAllListings();
  }, []);

  return (
    <>
      <h2>Hi</h2>

      <ErrorModal
        errorMessage={errorMessage}
        show={errorShow}
        handleClose={handleErrorClose}
      />

      {listings.map((listing) => {
        return (
          <div key={listing.id}>
            <HomeListingCard
              key={listing.id}
              token={token}
              listingId={listing.id}
              title={listing.title}
              street={listing.address.street}
              city={listing.address.city}
              state={listing.address.state}
              postcode={listing.address.postcode}
              country={listing.address.country}
              price={listing.price}
              thumbnail={listing.thumbnail}
              reviews={listing.reviews}
            />
          </div>
        );
      })}
    </>
  );
}

export default Home;
