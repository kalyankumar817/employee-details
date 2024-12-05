import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Dashboard = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users/dashboard', { withCredentials: true });
        if (response.data.valid) {
          setMessage(response.data.message);
        } else {
          navigate('/');
        }
      } catch (err) {
        console.error('Dashboard error:', err);
        navigate('/');
      }
    };

    fetchDashboard();
  }, [navigate]);

  // Logout Function
  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:3000/users/logout', {}, { withCredentials: true });
      console.log("Logout successful:", response.data);
      navigate('/'); // Redirect to login page after logout
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <>
      <header>
        <Navbar/>
      </header>
      <main>
        <div>
          <h1>Dashboard</h1>
          <p>{message}</p>
          <button onClick={handleLogout}>Logout</button>
          <NavLink to='/employeeslist'>Employees List</NavLink>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
