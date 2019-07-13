const mongoose=require('mongoose');
const schema=require('../schemas/menuSchema.js');

const Menu=mongoose.model('menu',schema);

module.exports=Menu;
