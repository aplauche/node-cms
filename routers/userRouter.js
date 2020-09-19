const mongoose = require('mongoose')
const express = require('express')

const userRouter = express.Router()


userRouter.get('/')
userRouter.post('/')
userRouter.put('/')
userRouter.delete('/')


userRouter.get('/:userId')
userRouter.post('/:userId')
userRouter.put('/:userId')
userRouter.delete('/:userId')



module.exports = userRouter;