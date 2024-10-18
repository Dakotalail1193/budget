const mongoose = require('mongoose')
const Schema = mongoose.Schema

const depositSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    deposit: {
        type: Number,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Deposit", depositSchema)



