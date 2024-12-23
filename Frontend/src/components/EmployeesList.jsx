import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/EmployeesList.css';

const EmployeesList = () => {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // State to manage search query

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users/employees/getall', { withCredentials: true });
                setEmployees(response.data);
            } catch (err) {
                console.error('Error fetching employees:', err.response?.data?.message || err.message);
            }
        };
        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await axios.delete(`http://localhost:3000/users/employees/delete/${id}`, { withCredentials: true });
                setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee._id !== id));
                alert('Employee deleted successfully!');
            } catch (err) {
                console.error('Error deleting employee:', err.response?.data?.message || err.message);
                alert('Failed to delete employee.');
            }
        }
    };

    // Handle change in search input
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter employees based on search query
    const filteredEmployees = employees.filter((employee) =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.designation.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <div>
                    <h2>Employees List</h2>
                    {/* Search input */}
                    <label>Search: </label>
                    <input
                        type="text"
                        placeholder="Search by name or designation"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Designation</th>
                                <th>Gender</th>
                                <th>Courses</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map((employee) => (
                                <tr key={employee._id}>
                                    <td>
                                        <img src={employee.imageurl} alt={employee.name} style={{ width: '50px' }} />
                                    </td>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.mobile}</td>
                                    <td>{employee.designation}</td>
                                    <td>{employee.gender}</td>
                                    <td>{employee.course.join(', ')}</td>
                                    <td>
                                        <NavLink to={`/updateemployee/${employee._id}`}>Edit</NavLink>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(employee._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
};

export default EmployeesList;
