var schema=require('../schemas/ordersSchema');
var mongoose=require('mongoose');
const Orders=mongoose.model('orders',schema);
module.exports=Orders;