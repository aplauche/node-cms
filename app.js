const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

require('dotenv').config()

// import Routers
const userRouter = require('./routers/userRouter')
const pageRouter = require('./routers/pageRouter')
const postRouter = require('./routers/postRouter')


// database connection
const connect = mongoose.connect(process.env.MONGOURL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

connect.then((db)=>{
  console.log('connected to database')
}, (err)=> console.log(err))



// Start up express app
const app = new express()

app.listen(4000, ()=> {
    console.log('listening at port 4000')
})


// Middlewares 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req,res)=>{
    res.status(200).json({status: 'up and running'})
})

// Routes
app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/pages', pageRouter)


// Error Handling 

// error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
   error: {
   status: error.status || 500,
   message: error.message || 'Internal Server Error',
  },
 });
});