import mongoose from "mongoose";

const teamScore = new mongoose.Schema({
    teamName: {type: String, required: true},
    gamesWon: {type: Number, required: true}
})
const resultSchema = new mongoose.Schema({
    groupOne: [teamScore],
    groupTwo: [teamScore]
}, {
    collection: 'results'
})

export default mongoose.model('Result', resultSchema)