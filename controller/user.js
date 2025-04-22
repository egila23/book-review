import User from "../model/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }

  try {
    const userAvailable = await User.findOne({ email: email });
    if (userAvailable) {
      return res.status(400).json({ message: "User already registered" });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      role,
    });
    res.status(200).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      {
        user: {
          name: user.name,
          id: user._id,
          email: user.email,
          role: user.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );

    res.status(201).json({
      _id: user._id,
      email: user.email,
      role: user.role,
      token: token,
    });
  } catch (err) {
    next(err);
  }
};
