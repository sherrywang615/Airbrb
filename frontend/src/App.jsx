import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login';
import Register from './components/Register';
import Home from './components/Home';
import NavBar from './components/NavBar';
import HostedListings from './components/HostedListings';
import ListingDetails from './components/ListingDetails';
import BookingRequests from './components/BookingRequests';

function App () {
  const [token, setToken] = React.useState('');
  const [email, setEmail] = React.useState('');

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }
    const email = localStorage.getItem('email');
    if (email) {
      setEmail(email);
    }
  }, []);

  return (
    <BrowserRouter>
      <NavBar token={token} setToken={setToken} />
      <Routes>
        <Route path='/' element={<Home token={token}/>} />
        <Route
          path='/login'
          element={<Login token={token} setToken={setToken} email={email} setEmail={setEmail}/>}
        />
        <Route
          path='/register'
          element={<Register token={token} setToken={setToken} email={email} setEmail={setEmail}/>}
        />
        <Route
          path='/hosted-listings'
          element={<HostedListings token={token} email={email}/>}
        />
        <Route path="/listing/:id" element={<ListingDetails token={token} email={email}/>} />
        <Route path="/listing/:listingId/bookings" element={<BookingRequests token={token}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
