const express = require("express");
const mongoose = require("mongoose");
const { Router } = require("express");
const schema = require("../models/schema");
const { restart } = require("nodemon");
const route = Router();



var cart = schema.additem;

route.post('/', async (req, res) => {
    try {
      const { name, price, category, image, description } = req.body;
      // Check if the item already exists in the database
      let item = await cart.findOne({ name });
  
      if (item) {
        // If the item exists, update the item count
        item.items += 1;
      } else {
        // If the item doesn't exist, create a new item
        item = new cart({
          name,
          price,
          category,
          image,
          description,
          items: 1 // Set initial count to 1
        });
      }
  
      // Save the item to the database
      await item.save();
      res.send({ message: "fooditem successful added", item: item });
    //   res.json({ item });
    } catch (err) {
      res.status(500).send('Server Error');
    }
  });


  route.post('/getCartData', async (req, res) => {
    try {
       const data = await schema.additem.find();
       res.send(data);
    //   res.json({ item });
    } catch (err) {
      res.status(500).send('Server Error');
    }
  });

  route.post('/deleteCartData', async (req, res) => {
     try {

       const { id }=  req.body;
       const data = await schema.additem.findById(id);
       if(data.items === 1){
        const result = await schema.additem.findByIdAndDelete(id);
        res.send(result);
       }else{
          const result = await schema.additem.findByIdAndUpdate(id, { $inc: { items: -1 } });
          res.send(result);
       };
    } catch (err) {
      res.status(500).send('Server Error');
    }
  });

  
  
  module.exports = route;