const { request } = require('express')

const { validationResult } = require('express-validator')
const { verify } = require('jsonwebtoken')

const UserModell = require('../models/user.modell')

const validate = (req,res,next)=>{

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors
        })
    }

    next()

}

const validateLoginJWT = async(req,res,next) => {

    const token = req.header('x-token')

    if( !token ) {
        return next()
    }
    
    try {

        // verify signed token
        
        const { userData } = verify(token, process.env.USERTOKENKEY)

        const { password, email, username } = await UserModell.findById(userData)

        /* req.body.password = password
        req.body.email = email */

        return res.status(200).json({
            username
        })

    } catch (error) {
        
        res.status(400).json({
            msg: 'Invalid Token'
        })

    }

}   

const validateJWT = async (req = request,res,next) => {

    if(!req.header('x-token'))
        return res.status(400).json({
            msg: 'Token is required'
        })

    const token = req.header('x-token')

    try {

        const decoded = verify(token, process.env.USERTOKENKEY)
        if(!decoded){
            return res.status(400).json({
                msg: 'Invalid Token'
            })
        } 

        const userData = await UserModell.findById(decoded.userData)

        req.userData = userData

        next()

    } catch (error) {
        return res.status(400).json({
            msg: 'Invalid Token'
        })
    }

}

module.exports = {
    validate,
    validateLoginJWT,
    validateJWT
}