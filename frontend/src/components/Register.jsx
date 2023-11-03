import React from 'react';

function Register (props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [name, setName] = React.useState('');

  const register = (e) => {
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
        } else {
          if (data.token) {
            localStorage.setItem('token', data.token);
            props.setToken(data.token);
          }
        }
      });
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
    </>
  );
}

export default Register;
