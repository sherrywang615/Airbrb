import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import { useNavigate } from 'react-router-dom';

// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';

function Login (props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const login = (e) => {
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
        } else {
          if (data.token) {
            localStorage.setItem('token', data.token);
            props.setToken(data.token);
            navigate('/dashboard');
          }
        }
      });
  }

  return (
    <>
      <h2>Login</h2>
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
      <button onClick={login}>Login</button>
    </>
  );
}

export default Login;
