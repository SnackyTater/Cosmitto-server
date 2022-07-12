import mongoose from 'mongoose'

export default function (callback = () => { }) {
    mongoose
        .connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => callback())
        .catch((err) => console.log(err));

    mongoose.Promise = global.Promise;

    return mongoose;
}