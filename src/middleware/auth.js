import asyncHandler from 'express-async-handler'

export const protected = asyncHandler(async(req, res, next) =>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            // verifikasi token 
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN)

            // cek user untuk mengambil data yg di butuhkan dar table users
            req.users = {}

            next();
        } catch (error) {
            res.status()
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})