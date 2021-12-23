import asyncHandler from 'express-async-handler'

import authService from '../services/authServices.js'
const users = new authService()

export const protected = asyncHandler(async(req, res, next) =>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            // verifikasi token 
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN)
            // cek user untuk mengambil data yg di butuhkan dar table users
            const user = await users.getByID(decoded.id)

            req.users = {
                id:user.id,
                email: user.email,
                username: user.username
            }

            next();
        } catch (error) {
            next(error)
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})