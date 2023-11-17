import React from 'react';
import ErrorModal from './ErrorModal';
import HomeListingCard from './HomeListingCard';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from 'react-bootstrap/Button';
import Grid from '@mui/system/Unstable_Grid';

// Home page component
function Home (props) {
  const [listings, setListings] = React.useState([]);
  const [minNumBedrooms, setMinNumBedrooms] = React.useState(0);
  const [maxNumBedrooms, setMaxNumBedrooms] = React.useState(0);
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [errorShow, setErrorShow] = React.useState(false);
  const [start, setStart] = React.useState(new Date());
  const [end, setEnd] = React.useState(new Date());
  const [titleLoc, setTitleLoc] = React.useState('');
  const handleErrorShow = () => setErrorShow(true);
  const handleErrorClose = () => setErrorShow(false);
  const [selectedParameter, setSelectedParameter] = React.useState('');
  const [detailedListings, setDetailedListings] = React.useState([]);
  const [sortOrder, setSortOrder] = React.useState('');

  const handleParameterChange = (event) => {
    setSelectedParameter(event.target.value);
  };

  // When the user clicks the submit button, filter the listings based on the selected parameter
  const handleSearchSubmit = () => {
    switch (selectedParameter) {
      case 'titleLocation':
        return setListings(
          detailedListings.filter(
            (listing) =>
              listing.title.toLowerCase().includes(titleLoc.toLowerCase()) ||
              listing.address.city
                .toLowerCase()
                .includes(titleLoc.toLowerCase())
          )
        );
      case 'numBedrooms':
        return setListings(
          detailedListings.filter(
            (listing) =>
              listing.metadata.bedrooms >= minNumBedrooms &&
              listing.metadata.bedrooms <= maxNumBedrooms
          )
        );
      case 'dateRange':
        return setListings(
          detailedListings.filter((listing) => {
            return listing.availability.some((range) => {
              const rangeStart = new Date(range.start);
              const rangeEnd = new Date(range.end);
              const days = Math.ceil((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24));
              const totalPrice = listing.price * days;
              listing.totalPrice = totalPrice;
              return new Date(start) >= rangeStart && new Date(end) <= rangeEnd;
            });
          })
        );
      case 'price':
        return setListings(
          detailedListings.filter(
            (listing) => listing.price >= minPrice && listing.price <= maxPrice
          )
        );

      case 'ratings':
        return setListings(
          detailedListings.sort((a, b) => {
            if (sortOrder === 'highestToLowest') {
              return b.rating - a.rating;
            } else {
              return a.rating - b.rating;
            }
          })
        );
    }
  };

  // Filter parameters
  const parameters = [
    {
      value: 'titleLocation',
      label: 'Title and location',
    },
    {
      value: 'numBedrooms',
      label: 'Number of bedrooms',
    },
    {
      value: 'dateRange',
      label: 'Date range',
    },
    {
      value: 'price',
      label: 'Price',
    },
    {
      value: 'ratings',
      label: 'Review ratings',
    },
  ];

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

  // Call api to get a listing for a given listing id
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

  // Call getAllListings() when component mounts and sort the listings in alphabetical order
  React.useEffect(() => {
    getAllListings().then(async (listings) => {
      const publishedListingIds = localStorage.getItem('publishedListingIds');
      if (publishedListingIds) {
        const publishedListingIdsArr = JSON.parse(publishedListingIds);
        const filteredListings = listings.filter((listing) =>
          publishedListingIdsArr.includes(listing.id.toString())
        );
        const sortedListings = filteredListings.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        setListings(sortedListings);
      }
    });
  }, []);

  // Call getListing() for each listing to get the listing details when listings change
  React.useEffect(() => {
    const getListingDetails = async () => {
      try {
        const listingsData = await Promise.all(
          listings.map(async (listing) => {
            const listingData = await getListing(listing.id);
            if (listing.reviews.length === 0) {
              listingData.rating = 0;
            } else {
              const rating = listing.reviews.reduce((acc, review) => {
                return acc + review.rating;
              }, 0);
              const avgRating = rating / listing.reviews.length;
              listingData.rating = avgRating;
            }
            return listingData;
          })
        );
        setDetailedListings(listingsData);
      } catch (error) {
        setErrorMessage(error.message);
        handleErrorShow();
      }
    };
    getListingDetails();
  }, [listings]);

  return (
    <>
      <h2>All Listings</h2>

      <TextField
        id='search-parameter'
        select
        label='Filter by'
        defaultValue=''
        margin='normal'
        onChange={handleParameterChange}
        helperText='Select a filter parameter'>
        {parameters.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      {selectedParameter === 'dateRange' && (
        <>
          <TextField
            id='start-date'
            label='Start Date'
            type='date'
            margin='normal'
            value={start}
            onChange={(event) => setStart(event.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id='end-date'
            label='End Date'
            type='date'
            value={end}
            onChange={(event) => setEnd(event.target.value)}
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
          />
        </>
      )}
      {selectedParameter === 'price' && (
        <>
          <TextField
            label={'Minimum price'}
            id='search-textfield'
            margin='normal'
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
          />
          <TextField
            label={'Maximum price'}
            id='search-textfield'
            margin='normal'
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
          />
        </>
      )}
      {selectedParameter === 'numBedrooms' && (
        <>
          <TextField
            label={'Minimum number'}
            id='search-textfield'
            margin='normal'
            value={minNumBedrooms}
            onChange={(event) => setMinNumBedrooms(event.target.value)}
          />
          <TextField
            label={'Maximum number'}
            id='search-textfield'
            margin='normal'
            value={maxNumBedrooms}
            onChange={(event) => setMaxNumBedrooms(event.target.value)}
          />
        </>
      )}
      {selectedParameter === 'titleLocation' && (
        <TextField
          label={'Enter a title or city'}
          id='search-titelLoc'
          margin='normal'
          value={titleLoc}
          onChange={(event) => setTitleLoc(event.target.value)}
        />
      )}

      {selectedParameter === 'ratings' && (
        <TextField
          id='sort-order'
          select
          label='Sort Order'
          margin='normal'
          onChange={(e) => setSortOrder(e.target.value)}
          helperText='Select a sort order'>
          <MenuItem value='highestToLowest'>
            Sort from highest to lowest
          </MenuItem>
          <MenuItem value='lowestToHighest'>
            Sort from lowest to highest
          </MenuItem>
        </TextField>
      )}
      <div>
        {selectedParameter && (
          <Button margin='normal' onClick={() => handleSearchSubmit()}>
            Submit
          </Button>
        )}
      </div>

      <ErrorModal
        errorMessage={errorMessage}
        show={errorShow}
        handleClose={handleErrorClose}
      />

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {listings.map((listing, index) => (
            <Grid xs={3} sm={4} key={index}>
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
                totalPrice={listing.totalPrice}
              />
            </Grid>
          ))}
        </Grid>
    </>
  );
}

export default Home;
