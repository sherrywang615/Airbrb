import React from 'react';
import ErrorModal from './ErrorModal';
import HomeListingCard from './HomeListingCard';

// Home page component
function Home (props) {
  const [listings, setListings] = React.useState([]);
  // const [filteredResults, setFilteredResults] = React.useState([]);
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

  // call the api to get all bookings
  // const getAllBookings = async () => {
  //   const res = await fetch('http://localhost:5005/bookings', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${props.token}`,
  //     },
  //   });
  //   const data = await res.json();
  //   if (data.error) {
  //     console.log(data.error);
  //     setErrorMessage(data.error);
  //     handleErrorShow();
  //   } else {
  //     return data.bookings;
  //   }
  // };

  // Call getAllListings() when component mounts and sort the listings in alphabetical order
  React.useEffect(() => {
    getAllListings().then(async (listings) => {
      const publishedListingIds = localStorage.getItem('publishedListingIds');
      if (publishedListingIds) {
        const publishedListingIdsArr = JSON.parse(publishedListingIds);
        const filteredListings = listings.filter((listing) =>
          publishedListingIdsArr.includes(listing.id.toString())
        );
        // const savedBookingIds = JSON.parse(
        //   localStorage.getItem(`bookingIds/${props.email}`)
        // );
        // const bookings = await getAllBookings();
        // const filteredBookings = bookings.filter((booking) =>
        //   savedBookingIds.includes(booking.id.toString())
        // );
        // const filteredListingsWithBooking = filteredListings.filter(
        //   (listing) => {
        //     const listingBookings = filteredBookings.filter(
        //       (booking) => booking.listingId === listing.id.toString()
        //     );
        //     return listingBookings.some(
        //       (booking) =>
        //         booking.status === 'accepted' || booking.status === 'pending'
        //     );
        //   }
        // );
        // const filteredListingsWithoutBooking = filteredListings.filter(
        //   (listing) => {
        //     const listingBookings = filteredBookings.filter(
        //       (booking) => booking.listingId === listing.id.toString()
        //     );
        //     return !listingBookings.some(
        //       (booking) =>
        //         booking.status === 'accepted' || booking.status === 'pending'
        //     );
        //   }
        // );
        // const sortedListings = filteredListingsWithBooking
        //   .concat(filteredListingsWithoutBooking)
        //   .sort((a, b) => a.title.localeCompare(b.title));
        const sortedListings = filteredListings.sort((a, b) =>
          a.title.localeCompare(b.title)
        );

        setListings(sortedListings);
      }
    });
  }, []);

  // console.log(listings);

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
              token={props.token}
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
