const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    email: {
        type: String,
        require: [true, 'Email Harus Harus diisi']
    },
    name: {
        type: String,
        require: [true, 'Nama Harus Harus diisi']
    },
    password: {
        type: String,
        require: [true, 'Nama Harus Harus diisi']
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'admin'
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },
    phoneNumber: {
        type: String,
        require: [true, 'Nomor telepoon harus diisi']
    },
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)