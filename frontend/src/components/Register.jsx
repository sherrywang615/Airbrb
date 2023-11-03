import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
              props.setToken(data.token);
              navigate('/dashboard');
            }
          }
        });
    }
  };

  return (
    <>
      <h2>Register</h2>
      Email:{' '}
      <input
        type='text'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      Password:{' '}
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      Confirm Password:{' '}
      <input
        type='password'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <br />
      Name:{' '}
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <button onClick={register}>Register</button>
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
