var mongoose = require('mongoose');
// const schema=require('../schemas/menuSchema');
// const userSchema=require('../schemas/usersSchema');
const Schema=mongoose.Schema;
const ordersObject = {
    user: {
        type: String,
        required: true,
        ref:'user'
    },
    menu: {
        type: String,
        ref:'menu'
    },
    count: {
        type: Number
    },
    date: {
        type: Date,
        default:new Date()
    }
}
var ordersShema = new mongoose.Schema(ordersObject);
// ordersShema.index({ pkey: 1 }, { unique: true });
module.exports = ordersShema;