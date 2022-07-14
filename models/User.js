const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide name"],
        minLength:3,
        maxLength:50
    },
    email:{
        type:String,
        required:[true,"Please provide name"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
          unique:true,
    },
    name:{
        type:String,
        required:[true,"Please provide name"],
        minLength:3,
        maxLength:50
    },
    password:{
        type:String,
        required:[true,"Please provide password"],
        maxLength:50
    }
})


userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})



userSchema.methods.createJWT = function() {
    return jwt.sign({userId:this._id,name:this.name},process.env.JWT_KEY,{expiresIn:process.env.JWT_EXPIRE})
}

userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword,this.password)
    return isMatch
}

module.exports = mongoose.model('user',userSchema)