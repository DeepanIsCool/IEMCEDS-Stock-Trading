const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Sign-up function
const Sign_up = asyncHandler(async (req, res) => {
  const { email, password, name} = req.body;

  // Validate request
  if (!email || !password || !name) {
    return res.status(400).json("All fields are required");
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json("User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = {
    email,
    password: hashedPassword,
    name,
  };

  const user = await User.create(newUser);

  // Generate JWT without expiration
  const accessToken = jwt.sign(
    {
      user: {
        _id: user._id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET
  );

  // Assign token to user and save
  user.access_token = accessToken;
  await user.save();

  // Respond with the access token
  res.json({ accessToken });
});

// Sign-in function
const Sign_in = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate request
  if (!email || !password) {
    return res.status(400).json("All fields are required");
  }

  // Check if user exists
  const userAvailable = await User.findOne({ email });

  if (userAvailable && (await bcrypt.compare(password, userAvailable.password))) {
    // Generate JWT with expiration
    const accessToken = jwt.sign(
      {
        user: {
          _id: userAvailable._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    // Respond with the access token
    res.json({ accessToken });
  }
  else if(!userAvailable) {
    res.status(401).json("Please Sign-Up first");
  }
  else {
    res.status(401).json("Invalid email or password");
  }
});

// Fetch user data function
const getUserData = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404).json("User not found");
  }
});

const Sign_out = asyncHandler(async (req, res) => {
  // Invalidate the token on the client side
  res.status(200).json({ message: "User signed out successfully" });
});

module.exports = {
  Sign_up,
  Sign_in,
  Sign_out,
  getUserData,
};