import mongoose from "mongoose"
const Schema = mongoose.Schema

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
export default chat