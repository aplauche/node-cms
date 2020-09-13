const mongoose = require('mongoose')
const express = require('express')

const userRouter = express.Router()


userRouter.route('/')
    .get()
    .post()
    .put()
    .delete()

userRouter.route('/:userId')
    .get()
    .post()
    .put()
    .delete()


module.exports = userRouter;