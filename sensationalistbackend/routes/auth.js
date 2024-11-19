// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../database'); // Adjust the path if necessary
const router = express.Router();
const { Op } = require('sequelize'); // For advanced querying

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';

// Registration Route
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required.' });
  }

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }]
      }
    });

    if (existingUser) {
      return res.status(409).json({ message: 'Username or email already exists.' });
    }

    // Create the new user; 'beforeCreate' hook will hash the password
    const user = await User.create({
      username,
      email,
      passwordHash: password, // plain password; to be hashed in 'beforeCreate'
      role: role || 'customer' // Default role is 'customer' if not specified
    });

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    // Find the user by username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      console.log(`Login attempt failed: User ${username} not found.`);
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Use the instance method to validate password
    const isPasswordValid = await user.validatePassword(password);
    console.log(`Password validation for ${username}: ${isPasswordValid}`);

    if (!isPasswordValid) {
      console.log(`Login attempt failed: Invalid password for user ${username}.`);
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log(`User ${username} logged in successfully. Token generated.`);

    // Include the user data in the response
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email, // Include email if needed
        role: user.role,
        // Add other user properties as required
      },
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Middleware to authenticate JWT tokens
// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    next();
  });
};

// **Add this route to fetch user info**
router.get('/users/:id', authenticateToken, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    // Ensure that users can only access their own information
    if (userId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied.' });
    }

    const user = await User.findByPk(userId, {
      attributes: { exclude: ['passwordHash'] }, // Exclude sensitive data
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});



module.exports = router;

//curl -X POST http://localhost:5000/api/articles \
//-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczMDMwODg4MCwiZXhwIjoxNzMwMzEyNDgwfQ.cFVsaKGp9OsBV5CtJY8MkS0w8WHu-m08tJV6K4AA0Qc" \
//-F "title=The Sensationalist Issue 1" \
//-F "filetype=Issue" \
//-F "coverImage=@/c/Users/linco/Desktop/Past\ Issues/The-Sensationalist-Cover-1.png"
//-F "pdf=@/c/Users/linco/Desktop/Past\ Issues/The_Sensationalist_1.pdf"
//-F $'description=This Issue Includes:\nSymmetry (A short film script)\nThe Fabric Cube\nOne Day I Will Replace All the Caffeine in Your Coffee.\nNew Stanford Study Raises Alarm Over Widespread Addiction\nThe O.A.R. Project,\nMusic of the #1: Clubbing Harder @ Home'

//
//
//
//
//
//
