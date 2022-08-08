import mongoose from "mongoose"
const Schema = mongoose.Schema

const accountchema = new Schema({
    email: {
        type: String,
        unique: [true, 'exist'],
        required: [true, 'required']
    },
    password: {
        type: String,
        required: [true, 'required'],
    },
    mobile: {
        type: String,
        unique: [true, 'unique'],
        default: null,
    },
    created: {
        type: Date,
        default: new Date(),
    }
})

const account = mongoose.model('account', accountchema);
export default account;