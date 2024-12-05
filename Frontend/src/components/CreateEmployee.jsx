import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const CreateEmployee = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/users/employees/post',
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setMessage('Employee created successfully!');
        setFormData({
          imageurl: '',
          name: '',
          email: '',
          mobile: '',
          designation: '',
          gender: '',
          course: [],
        });
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error creating employee');
    }
  };

  return (
    <>
    <header>
      <Navbar/>
    </header>
    <main>
    <div>
      <h2>Create Employee</h2>
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
        <button type="submit">Create</button>
      </form>

      {/* Display Messages */}
      {message && <p>{message}</p>}
    </div>
    </main>
    </>
  );
};

export default CreateEmployee;
