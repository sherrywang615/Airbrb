import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function NaviationBar (props) {
  const navigate = useNavigate();

  const logout = () => {
    fetch('http://localhost:5005/user/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${props.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          props.setToken(null);
          localStorage.removeItem('token');
          navigate('/');
        }
      });
  };
  return (
    <>
      <Navbar expand='lg' className='bg-body-tertiary'>
        <Container>
          <Navbar.Brand href='/'>AirBrB</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='/'>Home</Nav.Link>
              {props.token
                ? (
                <>
                  <Nav.Link href='/hosted-listings'>View Hosted Listings</Nav.Link>
                  <Nav.Link>View All Listings</Nav.Link>
                  <Nav.Link onClick={logout}>Logout</Nav.Link>
                </>
                  )
                : (
                <>
                  <Nav.Link href='/login'>Login</Nav.Link>
                  <Nav.Link href='/register'>Register</Nav.Link>
                </>
                  )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NaviationBar;
