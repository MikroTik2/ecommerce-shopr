const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
let blogSchema = new mongoose.Schema({
    title:{
        type: [String],
        required:true,
    },
    category: {
        type: String,
        required:true,
    },
    numViews: {
        type: Number,
        required: true,
    },
    description:{
        type: [String],
        required:true,
    },
    images: {
        type: [String],
        required: true,
    },
    tags: {
        type: [String], 
        required: true,
    },
    author: {
        type: String,
        required: true,
    },

    commentUser: [{
        comment: String,
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    }],

}, { timestamps: true });

//Export the model
module.exports = mongoose.model('Blog', blogSchema);