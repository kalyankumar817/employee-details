const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Registration
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists, use another one' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, email, password: hashedPassword });
        res.status(200).json({ message: 'User registered successfully', user });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
};

// User Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const checkingUser = await User.findOne({ email });
        if (!checkingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const pwdValid = await bcrypt.compare(password, checkingUser.password);
        if (!pwdValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const accessToken = jwt.sign({ id: checkingUser._id }, process.env.JWT_SECRET, { expiresIn: '5m' });
        const refreshToken = jwt.sign({ id: checkingUser._id }, process.env.REFRESH_SECRET, { expiresIn: '10m' });

        checkingUser.refreshToken = refreshToken;
        await checkingUser.save();

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 5 * 60 * 1000,
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 10 * 60 * 1000,
        });

        res.status(200).json({ message: 'Login successful', accessToken, refreshToken });
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
};

// Logout User
const logout = async (req, res) => {
    console.log("Logout route hit");
    try {
        const refreshToken = req.cookies.refreshToken;
        console.log("Refresh token from cookie:", refreshToken);

        if (!refreshToken) {
            return res.status(400).json({ message: 'No refresh token provided' });
        }

        const checkingUser = await User.findOne({ refreshToken });
        if (!checkingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        checkingUser.refreshToken = null;
        await checkingUser.save();

        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        console.log("Logged out successfully");

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error logging out', error: err.message });
    }
};

// Middleware to verify the user with the access token and refresh token
const verifyUser = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken) {
        // Attempt to renew access token using refresh token
        if (!refreshToken) {
            return res.status(401).json({ message: 'No tokens provided. Please log in again.' });
        }

        jwt.verify(refreshToken, process.env.REFRESH_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Refresh token expired or invalid. Please log in again.' });
            }

            // Find the user by ID in the decoded refresh token
            const user = await User.findById(decoded.id);
            if (!user || user.refreshToken !== refreshToken) {
                return res.status(403).json({ message: 'Invalid refresh token. Please log in again.' });
            }

            // Generate a new access token
            const newAccessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5m' });

            // Set the new access token as a cookie
            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 5 * 60 * 1000, // 5 minutes
            });

            req.user = { id: user._id };
            next();
        });
    } else {
        // Verify the access token
        jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Access token expired or invalid. Please log in again.' });
            }

            req.user = { id: decoded.id };
            next();
        });
    }
};

//renew token
const renewToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided. Please log in again.' });
    }

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Refresh token expired or invalid. Please log in again.' });
        }

        const user = await User.findById(decoded.id);
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: 'Invalid refresh token. Please log in again.' });
        }

        const newAccessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5m' });

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 5 * 60 * 1000, // 5 minutes
        });

        res.status(200).json({ message: 'Access token renewed successfully', accessToken: newAccessToken });
    });
};

// Dashboard (Protected Route)
const dashboard = async (req, res) => {
    return res.status(200).json({ valid: true, message: 'Authorized access to dashboard' });
};

module.exports = { registerUser, loginUser, logout, verifyUser,renewToken,dashboard };
