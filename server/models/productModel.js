const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
let productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  description: {
    type: String,
    required: true,
  },
  
  category: {
    type: String,
    required: true,
  },

  images: {
    type:Array,
  },

  price: {
    type:Number,
    required: true,
  },

  numViews: {
    type: Number,
    default: 0,
  },

  quantity: {
    type: Number,
    default: 1,
  },

  sold: {
    type: Number,
    default: 0,
  },

  color: {
    type: [String],
    default: ["green", "red", "black", "purple"],
  },
  
  colorchose: {
    type: String,
    default: 'green'
  },

  size: {
    type: [String], 
    default: ["S", "M", "L", "XL"],
  },

  sizechose: {
    type: String,
    default: 'S'
  },

  style: {
    type: String,
    required: true,
  },

  ratings: [{
    star: Number,
    comment: String,
    postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  }],

  totalrating: {
    type: Number,
    default: 0,
  }, 

}, { timestamps: true } );

//Export the model
module.exports = mongoose.model('Product', productSchema);