const { StatusCodes } = require('http-status-codes')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {BadRequestError,UnautheticatedError} = require('../errors')


exports.register = async(req,res) => {
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({name:user.name,token})
    
}

exports.login = async(req,res) => {
    const {email,password} = req.body
    if(!email||!password){
        throw new BadRequestError('Pleaseprovide email and password')
    }
    const user = await User.findOne({email})
    if(!user){
        throw new UnautheticatedError("Invalid Credentials")
    }
    const isPasswordMatch = await user.comparePassword(password)
    if(!isPasswordMatch){
        throw new UnautheticatedError("Invalid Credentials")
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user:{name:user.name},token})
}