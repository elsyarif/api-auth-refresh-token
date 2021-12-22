import jwt from 'jsonwebtoken'

const generateToken = (id, secret, expires) => {
    return jwt.sign({id}, secret, {
        expiresIn : expires
    })
}

export default generateToken