const { Schema, model } = require('mongoose')

const User = new Schema({
    
    username: {
        type: String,
        required: [true, 'Username is required']
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [
            true
        ]
    },

    password: {
        type: String,
        required: [true, 'Password is required']
    },

})

module.exports = model('User', User)