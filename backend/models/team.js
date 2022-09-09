import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    teamName: { type: String, required: true },
    registrationDate: { type: Date, required: true },
    groupNumber: { type: Number, required: true }
}, {
    collection: 'teams'
})

export default mongoose.model('Team', teamSchema)