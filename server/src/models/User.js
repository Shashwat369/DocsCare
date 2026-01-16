const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        minlength : 3,

    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true,
        minlength : 6,
        select : false
    },
    gender : {
        type : String,
        enum : ['Male' , 'Female' , 'Other'],
        required : true
    },
    age :{
        type : Number,
        min : 0,
        max : 120

       
    },
    profilePicture : {
        type : String
    }
},{timestamps : true})

const User = mongoose.model('User' , userSchema)

module.exports = User