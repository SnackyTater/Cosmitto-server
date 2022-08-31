const mongoose = require("mongoose")
const Schema = mongoose.Schema

const limit = (features) => features.length === 2 ? true : false

const chatSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: [true, 'required'],
        validate: [limit, '{PATH} must contain 2 id']
    },
    logs: [{
        content: {
            type: String,
            default: '',
        },
        date: {
            type: Date,
            default: new Date(),
        },
    }]
})


const chat = mongoose.model('chat', chatSchema)
exports.default = chat