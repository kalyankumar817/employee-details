import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateEmployee from './components/CreateEmployee';
import UpdateEmployee from './components/UpdateEmployee';
import EmployeesList from './components/EmployeesList';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createemployee" element={<CreateEmployee />} />
          <Route path="/updateemployee/:id" element={<UpdateEmployee />} />
          <Route path="/employeeslist" element={<EmployeesList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
