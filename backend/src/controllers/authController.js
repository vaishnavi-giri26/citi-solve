import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* Generate JWT Token */
const generateToken = (id, role) => {
return jwt.sign(
{ id, role },
process.env.JWT_SECRET,
{ expiresIn: "7d" }
);
};

/* ============================= */
/* REGISTER USER */
/* ============================= */
export const register = async (req, res) => {
try {

const { name, email, password, role } = req.body;

/* check existing user */
const existingUser = await User.findOne({ email });

if (existingUser) {
  return res.status(400).json({
    message: "User already exists"
  });
}



/* create user */
const user = await User.create({
  name,
  email,
  password: password,
  role: role || "citizen"
});

res.status(201).json({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  token: generateToken(user._id, user.role)
});


} catch (error) {


console.error("REGISTER ERROR:", error);

res.status(500).json({
  message: "Server error during registration"
});


}
};

/* ============================= */
/* LOGIN USER */
/* ============================= */
export const login = async (req, res) => {

try {


const { email, password } = req.body;

/* find user */
const user = await User.findOne({ email });

if (!user) {
  return res.status(401).json({
    message: "Invalid email or password"
  });
}

/* compare password */

      if (!user || !user.password) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

const isMatch = await user.comparePassword(password);

if (!isMatch) {
  return res.status(401).json({
    message: "Invalid email or password"
  });
}

res.status(200).json({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  token: generateToken(user._id, user.role)
});


} catch (error) {

console.error("LOGIN ERROR:", error);

res.status(500).json({
  message: "Server error during login"
});


}

};
