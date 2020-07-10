const mongo = require('mongoose')

const Todo = mongo.Schema({
    userId:{
        type: Number,
        required:true,
        min:6,
        max:255
    },
    
    title:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    description:{
        type: String,
        required:true
    },
    priority:{
        type:String,
        required:true,

    },
    completed:{
        type:Boolean,
        required:true,
        default:false
    },
    dueDate:{
        type:Date,
        required:true,
    },
    setDate:{
        type:Date,
        required:true,
        default:Date.now()
    },
})


module.exports = mongo.model('Todo', Todo)