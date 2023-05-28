const { sign } = require('jsonwebtoken')

const generateJWT = (userData = '')=> {

    return new Promise((res, rej)=>{

        const payload = { userData }

        sign(payload, process.env.USERTOKENKEY,{ expiresIn: '7d' }, (err, token)=> {

            if(err){
                console.log(err);
                rej('Cannot sign the token ', err)
            } else {

                res(token)

            }

        })

    })

}

module.exports = {

    generateJWT

}