const { BadRequestError, UnauthenticatedError } = require('../errors')
const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
    const {token} = req.cookies

    if(req.cookies){
        try{

            const {userId, name} = jwt.verify(token, process.env.JWT_SECRET)
            req.user = {userId, name}  
            next()
        }
        catch(error){
            throw new UnauthenticatedError('Authentication invalid')
        }
    }else{
        throw new UnauthenticatedError('no token')
    }

    
}

module.exports = authMiddleware