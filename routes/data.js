const express = require("express");
const mongoose = require("mongoose");
const { Router } = require("express");
const schema = require("../models/schema");
const { restart } = require("nodemon");
const route = Router();



var data = schema.fooditem;
route.post("/", async (req, res,next) => {
   const {name , price , category , image, description} =  req.body;
//    cons
   const footdata = new data({name, price, category, image, description});
   try {
    await footdata.save();
    res.send({ message: "fooditem successful", response: "ok" });
  } catch (error) {
    res.status(500).send({ error: "An error occurred while saving  data" });
  }
});

route.post("/getdata", async (req, res) => {
    try {
      const data = await schema.fooditem.find();
      res.send(data);
    } catch (error) {
      res.status(500).send({ error: "An error occurred while fetching data" });
    }
  });
  

  route.post("/sortbyprice" , async (req, res) => {

    try {
      const {type} = req.body;
      if(type === 'asc'){
        const data  = await schema.fooditem.find().sort({ price: 1 });
        res.send(data);
      }
      else if(type === 'dsc'){
        const data  = await schema.fooditem.find().sort({ price: -1 });
        res.send(data);
      }
    } catch (error) {
      res.send(error.message);
    }
  })

module.exports = route;
