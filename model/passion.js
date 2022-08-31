const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userchema = new Schema({
    name: {
        type: String,
        required: [true, 'required'],
        default: ''
    }
})

const user = mongoose.model('user', userchema);
exports.default = user;