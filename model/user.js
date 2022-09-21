const mongoose = require("mongoose") 
const Schema = mongoose.Schema

const userchema = new Schema({
    account: {
        type: mongoose.Types.ObjectId,
        ref: "account",
        required: [true, "required"]
    },
    fullname: {
        type: String,
        required: [true, "required"]
    },
    dateOfBirth: {
        type: Date,
        required: [true, "required"]
    },
    passions: [
        {
            type: mongoose.Types.ObjectId,
            ref: "passion",
            default: []
        }
    ],
    gender: {
        type: String,
        enum: ["male", "female", "undisclosed"],
        default: "undisclosed"
    },
    galleries: [
        {
            imageID: String,
            url: String,
            _id: false,
            default: []
        }
    ],
    location: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: {
            type: [Number],
            default: [0, 0]
        }
    },
    interestedIn: {
        type: String,
        enum: ["male", "female", "both"],
        default: "both"
    },
    ageFrom: {
        type: Number,
        default: 18
    },
    ageTo: {
        type: Number,
        default: 31
    },
    zoneLimit: {
        type: Number,
        default: 10000
    },
    isLimit: {
        type: Boolean,
        default: true
    }
})

userchema.index({location: "2dsphere"})
const user = mongoose.model("user", userchema)
module.exports = user
