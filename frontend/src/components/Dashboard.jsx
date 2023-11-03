import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Dashboard (props) {
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
        }
      });
  };

  React.useEffect(() => {
    if (!props.token) {
      navigate('/');
    }
  }, [props.token]);

  return (
    <>
      <Link to='/'>Home</Link>
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>
    </>
  );
}

export default Dashboard;
