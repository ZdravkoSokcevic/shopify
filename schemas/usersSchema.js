const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

var usersObject = {
    id:{
        type: String,
        default:Math.random().toString(36).substr(7)
    },
    ime: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    type:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
}
// autoIncrement.initialize(mongoose.connection);
const usersShema = new mongoose.Schema(usersObject);
// usersShema.plugin(autoIncrement.plugin, 'id');
// usersShema.index({ id: 1 }, { unique: true });
module.exports = usersShema;