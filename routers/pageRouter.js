const mongoose = require('mongoose')
const express = require('express')

const pageRouter = express.Router()


pageRouter.get('/')
pageRouter.post('/')
pageRouter.put('/')
pageRouter.delete('/')


pageRouter.get('/:pageId')
pageRouter.post('/:pageId')
pageRouter.put('/:pageId')
pageRouter.delete('/:pageId')



module.exports = pageRouter;