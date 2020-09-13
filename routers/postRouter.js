const mongoose = require('mongoose')
const express = require('express')

const Posts = require('../models/Post')

const postRouter = express.Router()


postRouter.route('/')
    .get()
    .post((req,res,next)=>{
        Posts.create(req.body)
            .then(post => {
                res.status(200).json(post)
            })
            .catch(err=>{
                res.status(500).json({err: err})
            })
    })
    .put()
    .delete()

postRouter.route('/:postId')
    .get()
    .post()
    .put()
    .delete()


module.exports = postRouter;