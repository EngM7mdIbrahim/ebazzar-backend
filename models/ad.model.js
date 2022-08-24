const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
        default: 'I really want to sell my $title. It is really in a good condition!' 
    },
    price: {
        type: Number,
        required: true
    },
    sellerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    interestedBuyers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    finalBuyerID: {
        default: null,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Ad', adSchema);