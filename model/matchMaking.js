const mongoose = require("mongoose")
const Schema = mongoose.Schema

const matchMakingchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    matchMaking: [{
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'user',
        },
        status: {
            type: String,
            enum: ['like', 'pass', 'match'],
            default: 'pass',
        }
    }]
})

const matchMaking = mongoose.model('matchMaking', matchMakingchema);
exports.default = matchMaking;