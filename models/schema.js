const mongoose = require("mongoose");

const Signup = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  mobile:{type:Number},
  password:{type:String}
});

const FoodItem = new mongoose.Schema({
  name: { type: String },
  price: { type: Number },
  category: { type: String },
  image: { type: String },
  description: { type: String },
})

const Additem = new mongoose.Schema({
  name: { type: String },
  price: { type: Number },
  category: { type: String },
  image: { type: String },
  description: { type: String },
  items: { type: Number , default: 0 }
})

const signup = mongoose.model("signup", Signup);
const fooditem = mongoose.model("fooditem",FoodItem);
const additem = mongoose.model("additem",Additem);
var my_schemas = {
  signup: signup,
  fooditem: fooditem,
  additem: additem,
};

module.exports = my_schemas;
