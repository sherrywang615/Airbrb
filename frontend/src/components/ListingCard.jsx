import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function ListingCard (props) {
  // const deleteListing = () => {
  //   fetch(`http://localhost:5005/listings/${props.listingId}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${props.token}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.error) {
  //         console.log(data.error);
  //         // setErrorMessage(data.error);
  //         // handleShow();
  //       } else {

  //       }
  //     });
  // };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant='top' src='holder.js/100px180' />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.address}</Card.Text>
        <Button variant='outline-danger' size='sm'>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ListingCard;
