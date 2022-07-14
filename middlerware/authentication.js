const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {UnautheticatedError} = require('../errors')

const auth = async(req,res,next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        throw new UnautheticatedError("Authtication Invalid")
    }
    const token = authHeader.split(' ')[1]
    try {
        const comPass = await jwt.verify(token,process.env.JWT_KEY)
        if(!comPass){
        throw new UnautheticatedError("Authtication Invalid")
        }
        req.user = {userId:comPass.userId,name:comPass.name}
        next()
    } catch (error) {
        throw new UnautheticatedError("Authtication Invalid")
    }
}


module.exports = auth
