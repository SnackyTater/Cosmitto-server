import mongoose from "mongoose"
const Schema = mongoose.Schema

const sampleSchema = new Schema({
    name: {
        type: String,
        required: [true, 'required'],
        unique: [true, 'exist'],
        minlength: 5,
    }
})

const account = mongoose.model('sample', sampleSchema);
export default account;