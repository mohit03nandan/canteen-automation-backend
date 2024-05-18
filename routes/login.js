const express = require("express");
const mongoose = require("mongoose");
const { Router } = require("express");
const schema = require("../models/schema");
const { restart } = require("nodemon");
const route = Router();
// const jwt = require("jsonwebtoken");



var Signup = schema.signup;

route.post("/", async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ message: 'Please provide email and password' });
      }
      try {
        const user = await Signup.findOne({ email });
        if (!user) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
        if (user.password !== password) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
        // const token = jwt.sign({ userId: Signup._id }, '12345');

        return res.status(200).send({ message: "login successful" });
        
      }catch (error) {
        return res.status(500).send({ message: 'An error occurred while logging in' });
  }
  });
  
module.exports = route;


