// 

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};



// =============================
// REGISTER USER
// =============================
export const register = async (req, res) => {
  try {

    const { name, email, password, role } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // create user
    const user = await User.create({
      name,
      email,
      password, // password will be hashed automatically by User schema
      role: role || "citizen"
    });

    // send response
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
    });

  } catch (error) {

    console.log("REGISTER ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }
};



// =============================
// LOGIN USER
// =============================
export const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // login success
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
    });

  } catch (error) {

    console.log("LOGIN ERROR:", error);

    res.status(500).json({
      message: "Server error during login"
    });

  }

};