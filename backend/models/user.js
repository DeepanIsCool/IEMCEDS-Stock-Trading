const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: false,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: [false, "please add the password"],
    },

    first_name: {
      type: String,
      required: true,
    },

    last_name: {
        type: String,
        required: true,
      },
    
    ProfileImage: {
      type: String,
      required: false,
    },

    holdings: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },

    access_token: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("Users", userSchema, "USERS");
module.exports = User;
