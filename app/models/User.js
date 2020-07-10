const mongo = require('mongoose')

const User = mongo.Schema({
    name:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    email:{
        type:String,
        required:true,
        min:6,
        max:255,
        unique:true 
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:255
    }
})

module.exports = mongo.model('User',User)