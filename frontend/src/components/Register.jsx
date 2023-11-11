import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function Register (props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [show, setShow] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const register = (e) => {
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      handleShow();
    } else {
      fetch('http://localhost:5005/user/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
            setErrorMessage(data.error);
            handleShow();
          } else {
            if (data.token) {
              localStorage.setItem('token', data.token);
              localStorage.setItem('email', email);
              props.setToken(data.token);
              props.setEmail(email);
              navigate('/hosted-listings');
            }
          }
        });
    }
  };

  return (
    <>
      <h2>Register</h2>
      <Form>
        <Form.Group className='mb-2' controlId='registerEmail'>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            className='w-50'
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-2' controlId='registerName'>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            className='w-50'
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-2' controlId='registerPassword'>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            className='w-50'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='registerConfirmPassword'>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            className='w-50'
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit' onClick={register}>
          Register
        </Button>
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Login Failed: {errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Register;
