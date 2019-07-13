const mongoose=require('mongoose');
const schema=require('../schemas/usersSchema.js');

const User=mongoose.model('user',schema);

module.exports=User;