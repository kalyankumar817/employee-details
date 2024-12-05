import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    imageurl: '',
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
  });
  const [message, setMessage] = useState('');

  // Fetch employee details on component load
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/employees/get/${id}`,
          { withCredentials: true }
        );
        const data = response.data;
        setFormData({
          ...data,
          course: Array.isArray(data.course) ? data.course : [],
        });
      } catch (err) {
        setMessage('Error fetching employee details');
      }
    };
    fetchEmployee();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle checkboxes for 'course'
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        course: checked
          ? [...prev.course, value]
          : prev.course.filter((item) => item !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/users/employees/update/${id}`,
        formData,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setMessage('Employee updated successfully!');
        navigate('/employeeslist'); // Navigate back to the list
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error updating employee');
    }
  };

  return (
    <div>
      <h2>Update Employee</h2>
      <form onSubmit={handleSubmit}>
        {/* Image URL Field */}
        <input
          name="imageurl"
          placeholder="Image URL"
          value={formData.imageurl}
          onChange={handleChange}
          required
        />

        {/* Name Field */}
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        {/* Email Field */}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Mobile Field */}
        <input
          name="mobile"
          type="tel"
          placeholder="Mobile (10 digits)"
          value={formData.mobile}
          onChange={handleChange}
          required
        />

        {/* Designation Dropdown */}
        <select
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          required
        >
          <option value="">Select Designation</option>
          <option value="Manager">Manager</option>
          <option value="Developer">Developer</option>
          <option value="Tester">Tester</option>
          <option value="Designer">Designer</option>
          <option value="Intern">Intern</option>
        </select>

        {/* Gender Radio Buttons */}
        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleChange}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={formData.gender === 'Other'}
              onChange={handleChange}
            />
            Other
          </label>
        </div>

        {/* Course Checkboxes */}
        <div>
          <label>
            <input
              type="checkbox"
              name="course"
              value="MCA"
              checked={formData.course.includes('MCA')}
              onChange={handleChange}
            />
            MCA
          </label>
          <label>
            <input
              type="checkbox"
              name="course"
              value="BCA"
              checked={formData.course.includes('BCA')}
              onChange={handleChange}
            />
            BCA
          </label>
          <label>
            <input
              type="checkbox"
              name="course"
              value="BSC"
              checked={formData.course.includes('BSC')}
              onChange={handleChange}
            />
            BSC
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit">Update</button>
      </form>

      {/* Display Messages */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateEmployee;
