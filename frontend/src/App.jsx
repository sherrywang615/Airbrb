import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login';
import Register from './components/Register';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import NavBar from './components/NavBar';
import HostedListings from './components/HostedListings';

function App () {
  const [token, setToken] = React.useState('');

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <BrowserRouter>
      <NavBar token={token} setToken={setToken} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/login'
          element={<Login token={token} setToken={setToken} />}
        />
        <Route
          path='/register'
          element={<Register token={token} setToken={setToken} />}
        />
        <Route
          path='/dashboard'
          element={<Dashboard token={token} setToken={setToken} />}
        />
        <Route
          path='/hosted-listings'
          element={<HostedListings token={token} setToken={setToken} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
