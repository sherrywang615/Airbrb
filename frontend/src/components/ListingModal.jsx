import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function ListingModal (props) {
  return (
    <Modal
        show={props.show}
        aria-labelledby='contained-modal-title-vcenter'
        centered>
        <Modal.Body>
          <Form noValidate validated={props.validated}>
            <Form.Group className='mb-3' controlId='titleEdit'>
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Listing title'
                value={props.title}
                required
                onChange={(e) => props.setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formGridStreetEdit'>
              <Form.Label>Street</Form.Label>
              <Form.Control
                value={props.street}
                placeholder='e.g. 1 Kensington Street'
                required
                onChange={(e) => props.setStreet(e.target.value)}
              />
            </Form.Group>

            <Row className='mb-4'>
              <Form.Group as={Col} controlId='formGridCityEdit'>
                <Form.Label>City</Form.Label>
                <Form.Control
                  value={props.city}
                  required
                  onChange={(e) => props.setCity(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId='formGridStateEdit'>
                <Form.Label>State</Form.Label>
                <Form.Control
                  value={props.state}
                  required
                  onChange={(e) => props.setState(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId='formGridPostcodeEdit'>
                <Form.Label>Postcode</Form.Label>
                <Form.Control
                  value={props.postcode}
                  required
                  onChange={(e) => props.setPostcode(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId='formGridCountryEdit'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  value={props.country}
                  required
                  onChange={(e) => props.setCountry(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row className='mb-3'>
            <Form.Group as={Col} controlId='priceEdit'>
              <Form.Label>Price (per night):</Form.Label>
              <Form.Control
                type='text'
                placeholder='Listing price per night'
                required
                value={props.price}
                onChange={(e) => props.setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId='propertyTypeEdit'>
                <Form.Label>Property type:</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='apartment, house...'
                  required
                  value={props.type}
                  onChange={(e) => props.setType(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Form.Group controlId='formFileEdit' className='mb-3'>
              <Form.Label>Thumbnail:</Form.Label>
              <Form.Control type='file' required onChange={props.handleFileChange} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='bathroomsEdit'>
              <Form.Label>Number of bathrooms:</Form.Label>
              <Form.Control
                type='text'
                placeholder=''
                required
                value={props.bathrooms}
                onChange={(e) => props.setBathrooms(e.target.value)}
              />
            </Form.Group>
            <Row className='mb-3'>
              <Form.Group as={Col} controlId='bedroomsEdit'>
                <Form.Label>Number of bedrooms:</Form.Label>
                <Form.Control
                  type='text'
                  placeholder=''
                  required
                  value={props.bedrooms}
                  onChange={(e) => props.setBedrooms(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId='bedsEdit'>
                <Form.Label>Number of beds:</Form.Label>
                <Form.Control
                  type='text'
                  placeholder=''
                  required
                  value={props.beds}
                  onChange={(e) => props.setBeds(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Form.Group className='mb-3' controlId='amenitiesEdit'>
              <Form.Label>Property amenities:</Form.Label>
              <Form.Control
                type='text'
                placeholder='e.g. kitchen, parking, pool...'
                required
                value={props.amenities}
                onChange={(e) => props.setAmenities(e.target.value)}
              />
              <Form.Control.Feedback type='invalid'>
                Please fill out all required fields.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={props.handleClose}>
            Close
          </Button>
          <Button type='submit' onClick={props.handleSubmit} name="edit-listing-submit">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default ListingModal;
