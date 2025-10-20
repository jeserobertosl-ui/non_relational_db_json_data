const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    address: {
        required: true,
        type: {
            building: {
                required: true,
                type: String
            },
            coord: {
                required: true,
                type: [Number]
            },
            street: {
                required: true,
                type: String
            },
            zipcode: {
                required: true,
                type: String
            }
        }
    },
    borough: {
        required: true,
        type: String
    },
    cuisine: {
        required: true,
        type: String
    },
    grades: {
        required: true,
        type: [{
            date: {
                required: true,
                type: Date
            },
            grade: {
                required: true,
                type: String
            },
            score: {
                required: true,
                type: Number
            }
        }]
    },
    name: {
        required: true,
        type: String
    },
    restaurant_id: {
        required: true,
        type: String
    },
    comments: {
        type: [{
            required:true,
            type: String
        }]
    }
}, {collection: "restaurants"})

module.exports = mongoose.model('Data', dataSchema)