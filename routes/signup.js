const express = require("express");
const mongoose = require("mongoose");
const { Router } = require("express");
// const jwt = require("jsonwebtoken");
const schema = require("../models/schema");
const { restart } = require("nodemon");
const route = Router();



var Signup = schema.signup;

route.post("/", async (req, res, next) => {
    const { name, email, mobile, password } = req.body;
    const existingUser = await Signup.findOne({ email, password });
    if (existingUser) {
      return res.status(409).send({ error: "User already exists" });
    }
    const signup = new Signup({
      name,
      email,
      mobile,
      password
    });
    try {
      await signup.save();
      // const token = jwt.sign({ userId: signup._id }, '12345');
      return res.status(201).send({ message: "Signup successful" });
      
    } catch (error) {
      res.status(500).send({ error: "An error occurred while signing up" });
    }
  });
  
module.exports = route;
