const mongoose = require('mongoose');

// Define the user schema
const employeeSchema = new mongoose.Schema(
    {
        imageurl: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
            trim: true,
            minlength: [3, 'Username must be at least 3 characters long'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                'Please provide a valid email address',
            ],
        },
        mobile: {
            type: String, // Changed to String to support leading zeros (e.g., +911234567890)
            required: [true, 'Mobile number is required'],
            match: [
                /^\d{10}$/,
                'Please provide a valid 10-digit mobile number',
            ], // Validates only 10-digit numbers
        },
        designation: {
            type: String,
            enum: ['Manager', 'Developer', 'Tester', 'Designer', 'Intern'], // Add dropdown values here
            required: [true, 'Designation is required'],
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other'], // Restricted to specific values of radio button
            required: [true, 'Gender is required'],
        },
        course: {
            type: [String], // Changed to array to support multiple checkbox selections
            required: [true, 'At least one course is required'],
        },
    },
    { timestamps: true }
);

// Export the model
module.exports = mongoose.model('Employee', employeeSchema);
