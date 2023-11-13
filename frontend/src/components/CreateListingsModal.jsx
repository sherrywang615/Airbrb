import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListingCard from './ListingCard';
import ErrorModal from './ErrorModal';
import ListingModal from './ListingModal';
import AvailabilityModal from './AvailabilityModal';

// Component for creating a new listing
function CreateListingsModal (props) {
  const [validated, setValidated] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [thumbnail, setThumbnail] = React.useState(null);
  const [bathrooms, setBathrooms] = React.useState('');
  const [bedrooms, setBedrooms] = React.useState('');
  const [beds, setBeds] = React.useState('');
  const [amenities, setAmenities] = React.useState('');
  const [listingIds, setListingIds] = React.useState([]);
  const [listings, setListings] = React.useState([]);
  const [type, setType] = React.useState('');
  const metadata = { bathrooms, bedrooms, beds, amenities, type };
  const [street, setStreet] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [postcode, setPostcode] = React.useState('');
  const [country, setCountry] = React.useState('');
  const address = { street, city, state, postcode, country };
  const token = props.token;
  const email = props.email;
  const [errorMessage, setErrorMessage] = React.useState('');
  const [errorShow, setErrorShow] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const [editTitle, setEditTitle] = React.useState('');
  const [editStreet, setEditStreet] = React.useState('');
  const [editPrice, setEditPrice] = React.useState('');
  const [editCity, setEditCity] = React.useState('');
  const [editState, setEditState] = React.useState('');
  const [editCountry, setEditCountry] = React.useState('');
  const [editAmenities, setEditAmenities] = React.useState('');
  const [editBedrooms, setEditBedrooms] = React.useState('');
  const [editPostcode, setEditPostcode] = React.useState('');
  const [editBeds, setEditBeds] = React.useState('');
  const [editBathrooms, setEditBathrooms] = React.useState('');
  const [editThumbnail, setEditThumbnail] = React.useState('');
  const [editListingId, setEditListingId] = React.useState('');
  const [editType, setEditType] = React.useState('');
  const editAddress = {
    street: editStreet,
    city: editCity,
    state: editState,
    postcode: editPostcode,
    country: editCountry,
  };
  const editMetadata = {
    bathrooms: editBathrooms,
    bedrooms: editBedrooms,
    beds: editBeds,
    amenities: editAmenities,
    type: editType,
  };
  const [showAvailability, setShowAvailability] = React.useState(false);
  const [availability, setAvailability] = React.useState([]);
  const [publishListingId, setPublishListingId] = React.useState('');
  const [publishedListingIds, setPublishedListingIds] = React.useState([]);
  const [dateRanges, setDateRanges] = React.useState([{ start: null, end: null }]);
  const addDateRange = () => {
    setDateRanges([...dateRanges, { start: null, end: null }]);
  };
  const handleDateChange = (index, startOrEnd, newValue) => {
    const newDateRanges = [...dateRanges];
    newDateRanges[index][startOrEnd] = newValue;
    setDateRanges(newDateRanges);
  };

  // Modal handlers
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleErrorShow = () => setErrorShow(true);
  const handleErrorClose = () => setErrorShow(false);
  const handleAvailabilityShow = (listingId) => {
    setShowAvailability(true);
    setPublishListingId(listingId);
  }

  // Call the api to unpublish a listing and update localStorage and listings
  const handleUnpublishClick = (listingId) => {
    fetch(`http://localhost:5005/listings/unpublish/${listingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${props.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          setErrorMessage(data.error);
          handleErrorShow();
        } else {
          console.log('unpublished');
          setPublishedListingIds(publishedListingIds.filter((id) => id !== listingId));
          getListing(listingId).then((unpublishedListing) => {
            const savedListings = JSON.parse(localStorage.getItem(`listings/${email}`));
            const updatedListings = savedListings.map((listing) =>
              listing.id === unpublishedListing.id ? unpublishedListing : listing
            );
            localStorage.setItem(`listings/${email}`, JSON.stringify(updatedListings));
            setListings(updatedListings);
            const savedPublishedListingIds = JSON.parse(localStorage.getItem('publishedListingIds'));
            localStorage.setItem('publishedListingIds', JSON.stringify(savedPublishedListingIds.filter((id) => id !== listingId.toString())));
          });
        }
      });
  }

  // Function to convert file to data url
  function fileToDataUrl (file) {
    const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const valid = validFileTypes.find((type) => type === file.type);
    // Bad data, let's walk away.
    if (!valid) {
      throw Error('provided file is not a png, jpg or jpeg image.');
    }

    const reader = new FileReader();
    const dataUrlPromise = new Promise((resolve, reject) => {
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result);
    });
    reader.readAsDataURL(file);
    return dataUrlPromise;
  }

  // Show the edit modal and populate the fields with the listing's data
  const handleEditShow = (listing) => {
    setShowEdit(true);
    setEditTitle(listing.title);
    setEditPrice(listing.price);
    setEditThumbnail(listing.thumbnail);
    setEditBathrooms(listing.metadata.bathrooms);
    setEditBedrooms(listing.metadata.bedrooms);
    setEditBeds(listing.metadata.beds);
    setEditAmenities(listing.metadata.amenities);
    setEditStreet(listing.address.street);
    setEditCity(listing.address.city);
    setEditState(listing.address.state);
    setEditPostcode(listing.address.postcode);
    setEditCountry(listing.address.country);
    setEditListingId(listing.id);
    setEditType(listing.metadata.type);
  };

  // Handle the form submission for creating a new listing
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      fetch('http://localhost:5005/listings/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          address,
          price,
          thumbnail,
          metadata,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
            setErrorMessage(data.error);
            handleErrorShow();
          } else {
            setListingIds([...new Set([...listingIds, data.listingId])]);
            handleClose();
          }
        });
    }
    setValidated(true);
  };

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

  // Call the api to delete a listing and update localStorage and listings
  const handleDelete = (listingId) => {
    fetch(`http://localhost:5005/listings/${listingId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${props.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          setErrorMessage(data.error);
          handleErrorShow();
        } else {
          console.log('deleted');
          setListingIds((listingIds) =>
            listingIds.filter((id) => id !== listingId)
          );
          const savedListings = localStorage.getItem(`listings/${email}`);
          if (savedListings) {
            const listingsArray = JSON.parse(savedListings);
            const filteredListings = listingsArray.filter(
              (listing) => listing.id !== listingId
            );
            localStorage.setItem(`listings/${email}`, JSON.stringify(filteredListings));
            setListings(filteredListings);
          }
        }
      });
  };

  // Call the api to edit a listing
  const handleEditSubmit = (listingId) => {
    fetch(`http://localhost:5005/listings/${listingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({
        title: editTitle,
        address: editAddress,
        price: editPrice,
        thumbnail: editThumbnail,
        metadata: editMetadata,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          setErrorMessage(data.error);
          handleErrorShow();
        } else {
          console.log('edited');
          getListing(listingId).then((editedListing) => {
            const savedListings = JSON.parse(localStorage.getItem(`listings/${email}`));
            const updatedListings = savedListings.map((listing) =>
              listing.id === editedListing.id ? editedListing : listing
            );
            localStorage.setItem(`listings/${email}`, JSON.stringify(updatedListings));
            setListings(updatedListings);
          });
          setShowEdit(false);
        }
      });
  };

  // when listingIds changes, update the listings
  React.useEffect(() => {
    const promises = listingIds.map((listingId) => getListing(listingId));
    Promise.all(promises).then((results) => {
      updateListings(results);
    });
  }, [listingIds]);

  // update the listings when the component mounts
  React.useEffect(() => {
    // localStorage.removeItem(`listings/${email}`);
    const savedListings = localStorage.getItem(`listings/${email}`);
    if (savedListings && !listings.includes(JSON.parse(savedListings))) {
      setListings([...listings, ...JSON.parse(savedListings)]);
    }
  }, [props.email]);

  // update the listings
  const updateListings = (newListings) => {
    if (newListings.length > 0) {
      const filteredListings = newListings.filter((newListing) => {
        return !listings.some((listing) => listing.id === newListing.id);
      });
      setListings([...listings, ...filteredListings]);
      localStorage.setItem(
        `listings/${email}`,
        JSON.stringify([...listings, ...filteredListings])
      );
    }
  };

  // Convert the file to a data url when the file changes
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    fileToDataUrl(file).then((dataUrl) => {
      setThumbnail(dataUrl);
    });
  };

  // Convert the file to a data url when the file changes in the edit modal
  const handleEditFileChange = (event) => {
    const file = event.target.files[0];
    fileToDataUrl(file).then((dataUrl) => {
      setEditThumbnail(dataUrl);
    });
  };

  // Call the api to publish a listing
  const handleAvailabilitySubmit = (listingId) => {
    // const convertedDateRanges = dateRanges.map(range => ({
    //   start: new Date(range.start).toLocaleDateString(),
    //   end: new Date(range.end).toLocaleDateString(),
    // }));

    fetch(`http://localhost:5005/listings/publish/${listingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({
        availability: dateRanges,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          setErrorMessage(data.error);
          handleErrorShow();
        } else {
          console.log('published');
          setPublishedListingIds([...publishedListingIds, listingId]);
          getListing(listingId).then((publishedListing) => {
            const savedListings = JSON.parse(localStorage.getItem(`listings/${email}`));
            const updatedListings = savedListings.map((listing) =>
              listing.id.toString() === listingId ? publishedListing : listing
            );
            localStorage.setItem(`listings/${email}`, JSON.stringify(updatedListings));
            const savedPublishedListingIds = JSON.parse(localStorage.getItem('publishedListingIds')) || [];
            localStorage.setItem('publishedListingIds', JSON.stringify([...savedPublishedListingIds, listingId]));
            setListings(updatedListings);
          });
          setShowAvailability(false);
        }
      });
  };

  // Update localStorage when publishedListingIds changes
  // React.useEffect(() => {
  //   localStorage.setItem('publishedListingIds', JSON.stringify(publishedListingIds));
  // }, [publishedListingIds]);

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        Create a new listing
      </Button>

      <Modal
        show={show}
        aria-labelledby='contained-modal-title-vcenter'
        centered>
        <Modal.Body>
          <Form noValidate validated={validated}>
            <Form.Group className='mb-3' controlId='title'>
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Listing title'
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formGridAddress2'>
              <Form.Label>Street</Form.Label>
              <Form.Control
                value={street}
                placeholder='e.g. 1 Kensington Street'
                required
                onChange={(e) => setStreet(e.target.value)}
              />
            </Form.Group>

            <Row className='mb-4'>
              <Form.Group as={Col} controlId='formGridCity'>
                <Form.Label>City</Form.Label>
                <Form.Control
                  value={city}
                  required
                  onChange={(e) => setCity(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId='formGridState'>
                <Form.Label>State</Form.Label>
                <Form.Control
                  value={state}
                  required
                  onChange={(e) => setState(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId='formGridPostcode'>
                <Form.Label>Postcode</Form.Label>
                <Form.Control
                  value={postcode}
                  required
                  onChange={(e) => setPostcode(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId='formGridCountry'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row className='mb-3'>
            <Form.Group as={Col} controlId='price'>
              <Form.Label>Price (per night):</Form.Label>
              <Form.Control
                type='text'
                placeholder='Listing price per night'
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId='bedrooms'>
                <Form.Label>Property type:</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='apartment, house...'
                  required
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Form.Group controlId='formFile' className='mb-3'>
              <Form.Label>Thumbnail:</Form.Label>
              <Form.Control type='file' required onChange={handleFileChange} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='bathrooms'>
              <Form.Label>Number of bathrooms:</Form.Label>
              <Form.Control
                type='text'
                placeholder=''
                required
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
              />
            </Form.Group>
            <Row className='mb-3'>
              <Form.Group as={Col} controlId='bedrooms'>
                <Form.Label>Number of bedrooms:</Form.Label>
                <Form.Control
                  type='text'
                  placeholder=''
                  required
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId='beds'>
                <Form.Label>Number of beds:</Form.Label>
                <Form.Control
                  type='text'
                  placeholder=''
                  required
                  value={beds}
                  onChange={(e) => setBeds(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Form.Group className='mb-3' controlId='amenities'>
              <Form.Label>Property amenities:</Form.Label>
              <Form.Control
                type='text'
                placeholder='e.g. kitchen, parking, pool...'
                required
                value={amenities}
                onChange={(e) => setAmenities(e.target.value)}
              />
              <Form.Control.Feedback type='invalid'>
                Please fill out all required fields.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button type='submit' onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <ErrorModal
        errorMessage={errorMessage}
        show={errorShow}
        handleClose={handleErrorClose}
      />

      {/* Modal for editing listings */}
      <ListingModal
        show={showEdit}
        token={token}
        handleClose={() => setShowEdit(false)}
        title={editTitle}
        street={editStreet}
        city={editCity}
        state={editState}
        postcode={editPostcode}
        country={editCountry}
        price={editPrice}
        type={editType}
        thumbnail={editThumbnail}
        bathrooms={editBathrooms}
        bedrooms={editBedrooms}
        beds={editBeds}
        amenities={editAmenities}
        setTitle={setEditTitle}
        setAmenities={setEditAmenities}
        setBathrooms={setEditBathrooms}
        setBedrooms={setEditBedrooms}
        setBeds={setEditBeds}
        setStreet={setEditStreet}
        setCity={setEditCity}
        setState={setEditState}
        setCountry={setEditCountry}
        setPostcode={setEditPostcode}
        setPrice={setEditPrice}
        setType={setEditType}
        handleFileChange={handleEditFileChange}
        handleSubmit={() => handleEditSubmit(editListingId)}
      />

      <AvailabilityModal
        show={showAvailability}
        handleClose={() => setShowAvailability(false)}
        availability={availability}
        setAvailability={setAvailability}
        handleAvailabilitySubmit={() => handleAvailabilitySubmit(publishListingId)}
        dateRanges={dateRanges}
        setDateRanges={setDateRanges}
        addDateRange={addDateRange}
        handleDateChange={handleDateChange}
      />

      {listings.map((listing) => {
        return (
          <div key={listing.id}>
            <ListingCard
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
              type={listing.metadata.type}
              thumbnail={listing.thumbnail}
              bathrooms={listing.metadata.bathrooms}
              bedrooms={listing.metadata.bedrooms}
              beds={listing.metadata.beds}
              amenities={listing.metadata.amenities}
              reviews={listing.reviews}
              handleDelete={() => handleDelete(listing.id)}
              handleEditShow={() => handleEditShow(listing)}
              handleAvailabilityShow={() => handleAvailabilityShow(listing.id)}
              published={listing.published}
              handleUnpublishClick={() => handleUnpublishClick(listing.id)}
            />
          </div>
        );
      })}
    </>
  );
}

export default CreateListingsModal;
