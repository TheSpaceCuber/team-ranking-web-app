import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
    groupOne: [Object],
    groupTwo: [Object]
}, {
    collection: 'results'
})

export default mongoose.model('Result', resultSchema)