import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

import authService from '../services/authServices.js'
import generateToken from '../utils/generateToken.js'
const users = new authService()

export const protec = asyncHandler(async(req, res, next) =>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            if(token === 'null'){
                res.status(406)
                next(Error("Token invalid"));
            }
            // verifikasi token 
            const  decoded = await jwt.verify(token, process.env.JWT_ACCESS_TOKEN)
            // cek user untuk mengambil data yg di butuhkan dar table users
            const user = await users.getByID(decoded.id)

            req.user = {
                id:user.id,
                email: user.email,
                username: user.username
            }

            next();
        } catch (error) {
            res.status(403)
            next(error)
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

export const token = asyncHandler(async(req, res, next) => {
    try {
        const refreshtoken = req.cookies['x-refresh-token']
        if(!refreshtoken) throw new Error('tidak ada token')

        const user = await users.getToken(refreshtoken);

        if(!user) throw new Error('tidak ada token')
        // membuat accesstoken yg baru
        jwt.verify(refreshtoken, process.env.JWT_REFRESH_TOKEN, (err, decoded)=>{
            if(err)  throw new Error(err)

            const accessToken = generateToken(user.id, process.env.JWT_ACCESS_TOKEN, '15s')

            req.headers.authorization = `Bearer ${accessToken}`

            next()
        })
    } catch (error) {
        res.status(401)
        throw new Error(error.message)
    }
})