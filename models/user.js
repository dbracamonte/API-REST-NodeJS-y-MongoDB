'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcript = require('bcrypt-nodejs')
const crypto = require('crypto')

const UserSchema = new Schema({
    email: { typw: String, unique: true, lowercase: true },
    displaName: String,
    avatar: String,
    password: { type: String, select: false },
    singUpDate: { type: Date, default: Date.now() },
    lastLogin: Date
})

UserSchema.pre('save', (next) => {
    let user= this
    if (!user.isModified('password')) return next()

    bcript.genSalt(10, (err, salt) => {
        bcript.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err)

            user.password = hash
            next()
        })        
    })
})

UserSchema.methods.gravatar = function () {
    if (!this.email) return `https://www.gravatar.com/avatar/?s=200&d=retro`

    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://www.gravatar.com/avatar/${ md5 }?s=200&d=retro`
}

module.exports = mongoose.model('User', UserSchema)
