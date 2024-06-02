const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    countInStock: { 
        type: Number, 
        required: true 
    },
    imageUrl: { 
        type: String, 
        required: true 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        
        ref: 'User'
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    }
});
module.exports = mongoose.model('Product',productSchema);