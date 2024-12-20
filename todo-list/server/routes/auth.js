const express = require("express");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/auth");
const { User } = require("../db/models/User");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    // validate the req body
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide all required fields",
        success: false,
      });
    }

    // authenticate
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        message: "user not found",
        success: false,
      });
    }
    const hasValidPass = await bcrypt.compare(password, user.password);
    if (!hasValidPass) {
      return res.json({
        message: "incorrect password",
        success: false,
      });
    }
    const token = generateToken({
      email: user.email,
      id: user._id,
      username: user.username,
    });
    return res.json({
      data: {
        token,
      },
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

router.post("/signup", async (req, res) => {
  try {
    // validate the req body
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({
        message: "Please provide all required fields",
        success: false,
      });
    }
    // check if user already exists
    const users = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (users) {
      if (users.email === email) {
        return res.status(400).json({
          message: "Email already taken",
          success: false,
        });
      }
      // validate the username
      if (users.username === username) {
        return res.status(400).json({
          message: "Username already taken",
          success: false,
        });
      }
    }

    // write to the DB
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    return res.json({
      data: {
        ...newUser,
      },
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
