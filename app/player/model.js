const mongoose = require('mongoose')

let playerSchema = mongoose.Schema({
    email: {
        type: String,
        require: [true, 'Email Harus Harus diisi']
    },
    name: {
        type: String,
        require: [true, 'Nama Harus Harus diisi'],
        maxlength: [225, "Panjang Nama harus antara 3 - 225"],
        minlength: [3, "Panjang Nama harus antara 3 - 225"]
    },
    username: {
        type: String,
        require: [true, 'Nama Harus Harus diisi'],
        maxlength: [225, "Panjang Username harus antara 3 - 225"],
        minlength: [3, "Panjang Username harus antara 3 - 225"]
    },
    password: {
        type: String,
        require: [true, 'Nama Harus Harus diisi'],
        maxlength: [225, "Panjang Password harus antara 3 - 225"],
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
    avatar: {
        type: String
    },
    fileName: {
        type: String
    },
    phoneNumber: {
        type: String,
        require: [true, 'Nomor telepoon harus diisi'],
        maxlength: [225, "Panjang Username harus antara 3 - 225"],
        minlength: [3, "Panjang Username harus antara 3 - 225"]
    },
    favorite : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
}, {timestamps: true})

module.exports = mongoose.model('Player', playerSchema)