const mongoose = require('mongoose');
var menuObject = {
    id:{
        type: String,
        default:Math.random().toString(36).substr(7)
    },
    category: {
        type: String,
        enum: ['hrana', 'pice', 'dezert']
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    desc:{
        type:String
    }
}

const menuShema = new mongoose.Schema(menuObject);
module.exports = menuShema;