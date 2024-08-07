const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        maxlength:50,
        minlength:1
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:3
    },
})

const User = mongoose.model('Users',UserSchema);

module.exports = {User};