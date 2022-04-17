const Player = require('../player/model')

const path = require('path')
const fs = require('fs')
const config = require('../../config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    signup : async (req, res) => {
        try {

           payload = req.body

           if(req.file){
            let temp_path = req.file.path;
            let originalExtention = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1]
            let filename = req.file.filename + '.' + originalExtention;
            let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)

            const src = fs.createReadStream(temp_path)
            const dest = fs.createWriteStream(target_path)

            src.pipe(dest)

            src.on('end', async ()=>{
                try {
                    const player = new Player({
                        ...payload,
                        avatar: filename
                    })

                    await player.save()

                    delete player._doc.password

                    res.status(201).json({
                        data: player
                    })

                } catch (error) {
                    if(error && error.name === "ValidationError"){
                        return res.status(422).json({
                            message: error.message,
                            fields: error.errors
                        })
                    }
                }
            })
           } else {
               let player = new Player(payload)

               await player.save()

               delete player._doc.password

               res.status(201).json({
                   data: player
               })
           }

            
        } catch (error) {
            if(error && error.name === "ValidationError"){
                return res.status(422).json({
                    message: error.message,
                    fields: error.errors
                })
            }
        }
    },

    signin : (req, res, next) => {
        const {email, password} = req.body

        Player.findOne({email : email}).then((player)=> {
            if (player) {
                const checkPassword = bcrypt.compareSync(password, player.password)
                if(checkPassword){
                    const token = jwt.sign({
                        player: {
                            id : player.id,
                            username : player.username,
                            email : player.email,
                            name : player.name,
                            phoneNumber : player.phoneNumber,
                            avatar : player.avatar,
                        }
                    }, config.jwtKey)


                    res.status(200).json({
                        data: {token}
                    })
                }else{
                    res.status(403).json({
                        message: 'Password anda salah cuii'
                    })
                }
                
            } else {
                res.status(403).json({
                    message: 'email yang anda masukan belum terdaftar'
                })
            }
        }).catch((error)=>{
            res.status(500).json({
                message: error.message || 'Internal Server error'
            })

            next()
        })
    }
}