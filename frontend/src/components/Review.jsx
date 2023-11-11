import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Rating from '@mui/material/Rating';
import Form from 'react-bootstrap/Form';
import ErrorModal from './ErrorModal';

// Modal for leaving a review
function Review (props) {
  const [rating, setRating] = React.useState(0);
  const [comments, setComments] = React.useState('');
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

  // Call the api to post a new review for a listing
  const handleSubmit = async () => {
    const res = await fetch(
      `http://localhost:5005/listings/${props.listingId}/review/${props.bookingId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${props.token}`,
        },
        body: JSON.stringify({
          review: {
            rating,
            comments,
          },
        }),
      }
    );
    const data = await res.json();
    if (data.error) {
      console.log(data.error);
      setErrorMessage(data.error);
      handleErrorShow();
    } else {
      console.log('Review submitted');
      props.setReviewSubmittedShow(true);
      props.handleClose();
      getListing(props.listingId).then((reviewedListing) => {
        const savedListings = JSON.parse(localStorage.getItem(`listings/${reviewedListing.owner}`));
        const updatedListings = savedListings.map((listing) =>
          listing.id === reviewedListing.id ? reviewedListing : listing
        );
        localStorage.setItem(`listings/${reviewedListing.owner}`, JSON.stringify(updatedListings));
      });
    }
  };

  return (
    <>
      <Modal show={props.show}>
        <Modal.Header closeButton>
          <Modal.Title>Leave a review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Rating
            name='simple-controlled'
            value={rating}
            required
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          <Form>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlTextarea1'>
              <Form.Control
                as='textarea'
                rows={3}
                placeholder='Enter your comments here...'
                value={comments}
                onChange={(event) => {
                  setComments(event.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={props.handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={props.reviewSubmittedShow}>
        <Modal.Header closeButton>
          <Modal.Title>Review submitted!</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={() => {
              props.handleReviewSubmittedClose();
            }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <ErrorModal
        errorMessage={errorMessage}
        show={errorShow}
        handleClose={handleErrorClose}
      />
    </>
  );
}

export default Review;
