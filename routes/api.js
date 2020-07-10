const router = require('express').Router()
const Joi = require('@hapi/joi')
const User = require('../app/models/User')
const Todo = require('../app/models/Todo')
const bcrypt = require('bcrypt')


//Validation
const validationRegister = Joi.object({
    name:Joi.string().min(6).required(),
    email:Joi.string().min(6).required().email(),
    password:Joi.string().min(6).required(),
    confirmPassword:Joi.ref('password')
})

const validLogin = Joi.object({
    email: Joi.string().required().min(6).email(),
    password: Joi.string().required().min(6)
})


//Middleware

const auth = (req,res,next)=>{
    if(!req.session.userId){
        return res.send('You must log in').status(403)
    }
    next()
}




//----------------------Login--------------------//
router.post('/login', async (req,res)=>{

    const {userId} = req.session
    if(userId){
        return res.status(403).send('You are already Logged in')
    }

    const validation = validLogin.validate(req.body)
    if (validation.error){
        return res.send(validation.error.details[0].message).status()
    }
    const user = await User.findOne({email: req.body.email})
    if(!user.email){
        return res.send('incorrect username or password')
    }

    const validPass = bcrypt.compare(req.body.password,user.password)

    if (user && validPass){
        req.session.userId = user._id
        return res.status(200).send('Logged in')
    }
})


//----------------------register-----------------//
router.post('/register',async (req,res)=>{
    const validation = validationRegister.validate(req.body)
    if(validation.error){
       return res.send(validation.error.details[0].message)
    }
    if(!req.body.confirmPassword) {
        return res.send('Please Confirm Your Password!')
    }

    if(!req.body.password === req.body.confirmPassword) {
        return res.send('Passwords don`t match!')
    }

    if(User.findOne({email:req.body.email})){
        return res.send('User already exists!')
    }



    const salt = bcrypt.genSalt(20)
    const hashedPassword = bcrypt.hash(req.body.password,salt)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    })

    try {
        const savedUser = await user.save
        res.send('Successfully Registered').status(200)
        console.log(savedUser)
    } catch (err) {
        res.status(400).send(err)
    }


    
})



//----------------------logout------------------//
router.post('/logout', (req,res)=>{
    if(req.session.id){
        req.session.destroy()
        return res.status(200).send('logged out')
    }
})






// --------------------------------------------------------------------------------------------//
// ---------------------------------------Todo Routes------------------------------------//
// --------------------------------------------------------------------------------------------//

//----get one users todos
router.get('/todos',auth, async(req,res)=>{
    try {
        const todos = await Todo.find({userId:req.session.userId})
        res.send(todos).status(200)
    } catch (err) {
        res.send(err)
    }
    
})
//----create one todo todos
router.post('/todos',auth,async (req, res) => {
    const todo = new Todo({
        title: req.body.studentId,
        userId: req.session.userId,
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
    });
    try { 
        const studentSaved = await student.save();
        res.send('sucessfully saved your Todo').status(200);
    }catch(err){
        res.send(err).status(400)
    }
})

//----edit one todo todos
router.post('/todos/:id', auth, async(req,res)=>{
    try {
        const updatedTodo = await Student.updateOne(
            {_id: req.params.id},
            { $set: 
                {
                title: req.body.title,
                description: req.body.description,
                dueDate: req.body.dueDate,
                priority: req.body.priority,
                }
            });
            res.send('Successfully updated your Todo');
    } catch (err) {
        res.send(err).status(400)
    }

})
//----mark todos as completed
router.post('/todos/complete/:id',auth,async (req,res)=>{
    try {
        const completedTodo = await Student.updateOne(
            {_id: req.params.id},
            { $set: 
                {
                completed:true
                }
            });
            res.send('Marked as Completed');
    } catch (err) {
        res.send(err).status(400)
    }
})






module.exports = router