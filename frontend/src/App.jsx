import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import NavBar from './components/NavBar';

import 'bootstrap/dist/css/bootstrap.min.css';

function App () {
  const [token, setToken] = React.useState('');
  // const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <BrowserRouter>
      <NavBar token={token} setToken={setToken} />
      {/* <Link to='/'>Home</Link> | <Link to='/dashboard'>Dashboard</Link> |{' '}
      <Link to='/login'>Login</Link> | <Link to='/register'>Register</Link> */}
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
