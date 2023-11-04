import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListingCard from './ListingCard';

function CreateListingsModal (props) {
  const [validated, setValidated] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [title, setTitle] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [thumbnail, setThumbnail] = React.useState(null);
  const [bathrooms, setBathrooms] = React.useState('');
  const [bedrooms, setBedrooms] = React.useState('');
  const [beds, setBeds] = React.useState('');
  const [amenities, setAmenities] = React.useState('');
  //   const [listingId, setListingId] = React.useState('');
  //   const [listing, setListing] = React.useState('');
  const [listingIds, setListingIds] = React.useState([]);
  const [listings, setListings] = React.useState([]);
  const metadata = { bathrooms, bedrooms, beds, amenities };
  //   const [errorMessage, setErrorMessage] = React.useState('');

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
          Authorization: `Bearer ${props.token}`,
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
            // setErrorMessage(data.error);
            // handleShow();
          } else {
            setListingIds((listings) => [...listings, data.listingId]);
            handleClose();
          }
        });
    }
    setValidated(true);
  };

  const getListing = (listingId) => {
    return fetch(`http://localhost:5005/listings/${listingId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          // setErrorMessage(data.error);
          // handleShow();
        } else {
          return data;
        }
      });
  };

  //   console.log(listing);
  React.useEffect(() => {
    const promises = listingIds.map((listingId) => getListing(listingId));
    Promise.all(promises).then(
      (results) => {
        console.log(results);
        setListings(results);
      }
    );
  }, [listingIds]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setThumbnail(file);
  };

  console.log(listingIds);
  console.log(listings);

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
            <Form.Group className='mb-3' controlId='address'>
              <Form.Label>Address:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Listing address'
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='price'>
              <Form.Label>Price (per night):</Form.Label>
              <Form.Control
                type='text'
                placeholder='Listing price per night'
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='formFile' className='mb-3'>
              <Form.Label>Thumbnail:</Form.Label>
              <Form.Control
                type='file'
                required
                onChange={handleFileChange}
              />
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

      {listings.map((listing) => (
        <div key={listing.id}>
          <ListingCard
            key={listing.id}
            title={listing.title}
            address={listing.address}
            price={listing.price}
            // thumbnail={listing.thumbnail}
            // bathrooms={listing.metadata.bathrooms}
            // bedrooms={listing.metadata.bedrooms}
            // beds={listing.metadata.beds}
            // amenities={listing.metadata.amenities}
          />
        </div>
      ))}
    </>
  );
}

export default CreateListingsModal;
