const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TopicSchema = new Schema(
    {
        id: {},
        name: { type: String, required: true },
        viewCount: { type: Number, default: 0 },
        author: { type: String, default: null },
        locale: {type: String, default: 'en'}
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Topic', TopicSchema)