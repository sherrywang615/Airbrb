import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ErrorModal from './ErrorModal';
import Form from 'react-bootstrap/Form';

// Login component
function Login (props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Call the api to login
  const login = (e) => {
    e.preventDefault();
    fetch('http://localhost:5005/user/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
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
  };

  return (
    <>
      <h2>Login</h2>
      <Form>
        <Form.Group className='mb-3' controlId='loginEmail'>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            className='w-50'
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='loginPassword'>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            className='w-50'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit' onClick={login} name='login-button'>
          Login
        </Button>
      </Form>

      <ErrorModal show={show} handleClose={handleClose} errorMessage={errorMessage}/>
    </>
  );
}

export default Login;
