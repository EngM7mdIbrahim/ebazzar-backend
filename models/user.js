const { default: mongoose } = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    ads: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ad'}],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User',userSchema);