import mongoose from "mongoose"
const Schema = mongoose.Schema

const userchema = new Schema({
    account: {
        type: mongoose.Types.ObjectId,
        required: [true, 'required']
    },
    created: {
        type: Date,
        default: new Date(),
    }
})

const user = mongoose.model('user', userchema);
export default user;