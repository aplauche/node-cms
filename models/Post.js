const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        required: 'You must enter a title',

    },
    content:{
        type: String
    }
},{
    timestamps: true
})


var Posts = mongoose.model('Post', postSchema)

module.exports = Posts