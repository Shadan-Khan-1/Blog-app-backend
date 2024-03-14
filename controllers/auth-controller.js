const express = require("express");
const User = require("../models/User-model");
const Data = require("../models/Data-model");
//home ("/")
const home = async (req, res) => {
  try {
    res
      .status(200)
      .send("this is router using route Method in auth-controller se hai");
  } catch (error) {
    console.log(error);
  }
};

// SingUp User
const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res
        .status(409)
        .json({ msg: "This Email Aready Exist please Provide Another Email" });
    } else {
      const response = await User.create({ userName, email, password });
      res.status(200).json({
        msg: "SignUp user Successful",
        token: await response.generateToken(),
        userId: response._id.toString(),
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//  Login Logic
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email ,password);
    // console.log(await User.findone({email ,password}));
    const loginUser = await User.findOne({ email, password });
    if (loginUser) {
      // User found, send a success response
      res.status(200).json({ message: "Login successful",token: await loginUser.generateToken(), });
    } else {
      // User not found, send an error response
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Add user
const addUser = async (req, res) => {
  try {
    const { firstName, middleName, lastName, email, age, gender, hobbies } =
      req.body;
    const userExist = await Data.findOne({ email });
    if (!userExist) {
      const userCreate = await Data.create({
        firstName,
        middleName,
        lastName,
        email,
        age,
        gender,
        hobbies,
      });
      res
        .status(201)
        .json({ message: "user created successfully", userCreate });
    } else {
      return res
        .status(409)
        .json({ msg: "This Email Already Exist Please Provide Another Email" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const user = await Data.findByIdAndDelete(req.params.id);
    if (user) {
      res
        .status(200)
        .json({ message: "User deleted successfully", deletedUser: user });
    } else {
      res.status(404).json({
        error: "User not found",
        message: `User with ID '${req.params.id}' not found`,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const userd = await Data.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (userd) {
      res.status(200).json({ message: "User updated successfully", userd });
    } else {
      res.status(404).json({
        error: "User not found",
        message: `user with ID '${req.params.id}' not found`,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a Single User By Id
const getUserById = async (req, res) => {
  try {
    const user = await Data.findById(req.params.id);
    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({
        error: "User not found",
        message: `User with ID '${req.params.id}' not found`,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all user BY find METHOD
const getAllUser = async (req, res) => {
  try {
    const allUser = await Data.find();
    res.status(200).json(allUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  home,
  addUser,
  deleteUser,
  updateUser,
  getUserById,
  getAllUser,
  signup,
  login,
};
