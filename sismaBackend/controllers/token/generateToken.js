const jwt = require('jsonwebtoken')
function generateToken(payload){
    const expiredToken=30 * 30 * 1
    const secretKeyToken=process.env.Secret_Token
        const signToken = jwt.sign(payload,secretKeyToken,{expiresIn:expiredToken})
        return signToken
}
function decodeToken(payload){
    const decodeDataToken=jwt.decode(payload)
    if(decodeDataToken){
        return decodeDataToken
    }
    else{
        console.log('invalid decode token?')
    }
}
module.exports= {generateToken,decodeToken}