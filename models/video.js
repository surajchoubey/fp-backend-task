const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    channel: {type: String, required: true},
    description: {type: String, required: false},
    published_at: {type: String, required: true},
    thumbnail: {type: String, required: true}
})

const Video = mongoose.model('Video', videoSchema)

module.exports = Video