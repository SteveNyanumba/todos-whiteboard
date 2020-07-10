const express = require('express')
const session = require('express-session')
const app = express()
const dotenv = require('dotenv')
const mongo = require('mongoose')
const webRoutes = require('./routes/web')
const apiRoutes = require('./routes/api')
const bodyParser = require('body-parser')
const morgan = require('morgan')

dotenv.config({path:'./.env'})
const { PORT, SESS_NAME, APP_SECRET,NODE_ENV,DB_CONNECTION } = process.env

if(NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(bodyParser.json())



app.use(express.static('/public'))

app.use(session({
    name:SESS_NAME,
    resave:false,
    saveUninitialized:false,
    secret: APP_SECRET,
    cookie:{
        maxAge:360000,
        secure: NODE_ENV === 'production'
    }
}))


app.use('/',webRoutes)


app.use('/api/v1', apiRoutes)

mongo.connect(DB_CONNECTION, {useNewUrlParser:true,useUnifiedTopology:true}, ()=>{
    console.log('Connected to MongoDB Database');
})

app.listen(PORT, ()=>{
    console.log(`Server up and running http://127.0.0.1:${PORT}`);
})