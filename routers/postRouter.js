const mongoose = require('mongoose')
const express = require('express')


const Posts = require('../models/Post')

const postRouter = express.Router()



postRouter.get('/', async (req,res) => {
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

postRouter.post('/', async (req,res)=>{
    try {
        const newPost = await Posts.create(req.body)
        res.status(200).json(newPost)

    } catch {
        res.status(500).json({err: 'Post could not be created'})
    }
})

postRouter.put('/', (req,res) => {
        res.status(403).end('PUT not supported on this endpoint')
})

postRouter.delete('/', async (req,res)=>{
     try {
        const result = await Posts.remove({})
        res.status(200).json({status: result})
    } catch {
        res.status(500).json({err: 'DELETE operation failed'})
    }
        
})

postRouter.get('/:postId')
postRouter.post('/:postId')
postRouter.put('/:postId')
postRouter.delete('/:postId')



module.exports = postRouter;