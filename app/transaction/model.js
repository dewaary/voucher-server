const mongoose = require('mongoose')

let transactionSchema = mongoose.Schema({
    historyVoucherTopup: {
        gameName : {type : String, require: [true, 'Nama Game Harus Diiisi']},
        category : {type : String, require: [true, 'Kategori Game Harus Diiisi']},
        thumbnail : {type : String},
        coinName : {type : String, require: [true, 'Nama Koin Harus Diiisi']},
        coinQuantity : {type : String, require: [true, 'Jumlah Koin Harus Diiisi']},
        price : {type : Number}
    },

    historyPayment : {
        name : {type : String, require: [true, 'Nama Harus Diiisi']},
        type : {type : String, require: [true, 'Nama Game Harus Diiisi']},
        bankName : {type : String, require: [true, 'Nama Game Harus Diiisi']},
        noRekening : {type : String, require: [true, 'Nama Game Harus Diiisi']},
    },

    name : {
        type: String,
        require : [true, "nama harus diisi"],
        maxlength: [225, "Panjang Nama harus antara 3 - 225"],
        minlength: [3, "Panjang Nama harus antara 3 - 225"]
    },

    accountUser : {
        type: String,
        require : [true, "nama akun harus diisi"],
        maxlength: [225, "Panjang Nama harus antara 3 - 225"],
        minlength: [3, "Panjang Nama harus antara 3 - 225"]
    },

    tax : {
        type: Number,
        default: 0
    },

    value : {
        type : Number,
        default: 0,
    },

    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending'
    },

    player : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },

    historyUser : {
        name : {type : String, require: [true, 'Nama Player Harus Diiisi']},
        phoneNumber : {
            type: Number,
            require : [true, "Number Telp harus diisi"],
            maxlength: [13, "Panjang Nama harus antara 3 - 13"],
            minlength: [9, "Panjang Nama harus antara 3 - 13"]
        }
    },

    category : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },

    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

module.exports = mongoose.model('Transaction', transactionSchema)