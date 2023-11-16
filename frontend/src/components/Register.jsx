import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ErrorModal from './ErrorModal';

// Registration page
function Register (props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [errorShow, setErrorShow] = React.useState(false);
  const navigate = useNavigate();
  const handleErrorShow = () => setErrorShow(true);
  const handleErrorClose = () => setErrorShow(false);

  // Register a new user, and navigate to the hosted listings page
  const register = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      handleErrorShow();
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
            handleErrorShow();
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
        <Button variant='primary' type='submit' onClick={register} name='register'>
          Register
        </Button>
      </Form>

      <ErrorModal
        errorMessage={errorMessage}
        show={errorShow}
        handleClose={handleErrorClose}
      />
    </>
  );
}

export default Register;
