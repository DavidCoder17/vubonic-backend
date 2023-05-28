const bcryptjs = require('bcryptjs')
const { response } = require('express')

const { generateJWT } = require('../helpers/generate-jwt')
const User = require('../models/user.modell')

const signIn = async(req,res = response) =>{

    const { username, email, password, password2 } = req.body

    if(password2 !== password){
        return res.status(400).json({
            msg:'Passwords does not match'
        })
    }

    const user = new User({username, email, password})

    const salt = bcryptjs.genSaltSync(10)
    user.password = bcryptjs.hashSync(password, salt)

    const { _id } = await user.save()

    const token = await generateJWT(_id)

    res.status(200).json({
        msg: 'Signed In',
        token,
        username
    })

}

const logIn = async(req, res = response) => {
    
    const { email = '', password = '' } = req.body

    const userData = await User.findOne({email})
    if( !userData ){
        return res.status(404).json({
            msg: 'Wrong email or password'
        })
    }
    
    const validPassword = bcryptjs.compareSync(password, userData.password)
    if( !validPassword ){

        if( password !== userData.password )
        return res.status(404).json({
            msg: 'Wrong email or password'
        })

    }

    const token = await generateJWT(userData._id)

    res.status(200).json({
        msg:'Logged',
        token,
        username: userData.username
    })

}

module.exports = {
    signIn,
    logIn
}