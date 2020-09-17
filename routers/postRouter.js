const mongoose = require('mongoose')
const express = require('express')


const Posts = require('../models/Post')

const postRouter = express.Router()


postRouter.route('/')
    .get(async (req,res) => {
        try {
            const posts = await Posts.find({})
            if(posts.length > 0){
                res.status(200).json(posts)
            } else {
                res.status(200).json({status: 'No Posts Found...'})
            }
        } catch {
            res.status(500).json({err: 'Server error'})
        }
        
    })
    .post((req,res)=>{
        Posts.create(req.body)
            .then(post => {
                res.status(200).json(post)
            })
            .catch(err=>{
                res.status(500).json({err: err})
            })
    })
    .put((req,res) => {
        res.status(403).end('PUT not supported on this endpoint')
    })
    .delete(async (req,res)=>{
        try {
            const result = await Posts.remove({})
            res.status(200).json({status: result})
        } catch {
            res.status(500).json({err: 'DELETE operation failed'})
        }
        
    })

postRouter.route('/:postId')
    .get()
    .post()
    .put()
    .delete()


module.exports = postRouter;