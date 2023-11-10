import React from 'react';
import ErrorModal from './ErrorModal';
import HomeListingCard from './HomeListingCard';

// Home page component
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
      return data.listings;
    }
  };

  // Call getAllListings() when component mounts and sort the listings in alphabetical order
  React.useEffect(() => {
    getAllListings().then((listings) => {
      // const publishedListingIds = localStorage.getItem('publishedListingIds');
      // if (publishedListingIds) {
      //   const publishedListingIdsArr = JSON.parse(publishedListingIds);
      //   const filteredListings = listings.filter((listing) =>
      //     publishedListingIdsArr.includes(listing.id.toString())
      //   );
      const filteredListings = JSON.parse(localStorage.getItem('listings')).filter((listing) => listing.published === true);
      const sortedListings = filteredListings.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setListings(sortedListings);
    });
  }, []);

  // localStorage.removeItem('publishedListingIds');
  // console.log(JSON.parse(localStorage.getItem('publishedListings')));
  console.log(JSON.parse(localStorage.getItem('listings')).filter((listing) => listing.published === true));
  console.log(listings);

  return (
    <>
      <h2>All Listings</h2>
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
