const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')

const HASH_ROUND = 10

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

playerSchema.path('email').validate(async function (value) {
    try {
        const count = await this.model('Player').countDocuments({email : value})
        return !count;
    } catch (error) {
        throw error;
    }
}, attr => `${attr.value} Sudah Terdaftar`)

playerSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, HASH_ROUND)
    next()
})

module.exports = mongoose.model('Player', playerSchema)