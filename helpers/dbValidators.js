const { verify } = require("jsonwebtoken")
const User = require('../models/user.modell')

const emailExist = async(email = '')=>{

    const emailResult = await User.findOne({email})
    if(emailResult){
        throw new Error(`Email ${email} is already registered`)
    }

}

module.exports = {
    emailExist,
}