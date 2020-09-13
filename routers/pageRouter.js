const mongoose = require('mongoose')
const express = require('express')

const pageRouter = express.Router()


pageRouter.route('/')
    .get()
    .post()
    .put()
    .delete()

pageRouter.route('/:pageId')
    .get()
    .post()
    .put()
    .delete()


module.exports = pageRouter;