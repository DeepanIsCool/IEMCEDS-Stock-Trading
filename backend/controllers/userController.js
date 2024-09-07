const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const constants = require("../constants");

const Sign_up = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validate request
  if (!name || !email || !password) {
    return res.status(constants.VALIDATION_ERROR).json("All fields are required");
  }

  // Check if user already exists
  const userAvailable = await User.findOne({
    $or: [{ email: email }, { name: name }],
  });

  if (userAvailable) {
    return res.status(constants.CONFLICT).json("User already registered");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = {
    name: name,
    email: email,
    password: hashedPassword,
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
    // No 'expiresIn' key for indefinite token
  );

  // Assign token to user and save
  user.access_token = accessToken;
  await user.save();

  // Respond with the access token
  res.json({ accessToken: accessToken });
});

module.exports = { Sign_up };