import asyncHandler from 'express-async-handler'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";

import Response from '../utils/response.js'
import authService from '../services/authServices.js'

const users = new authService()

export const signup = asyncHandler(async(req, res, next) => {
    try {
        const { ...data } = req.body;
        const salt = await bcrypt.genSalt(10);
        
        // check singup user exist ? return status 403
        const exist = await users.get(data.email);
        if(exist) return Response.Json(null, Response.HTTP_FORBIDDEN, 'Email sudah terdaftar', res);
        
        const usercreate = await user.create({
            username: data.username,
            email: data.email,
            password: bcrypt.hashSync(data.password, salt),
        });

        if(usercreate){
            Response.Json(usercreate, Response.HTTP_CREATED, 'Berhasil Register', res);
        }
    } catch (error) {
        throw new Error(error.message);
    }
})

export const signin = asyncHandler(async(req, res) => {
    try {
        const { email, password } = req.body;
        
        // check username exist
        const rep = await users.get(email);
        if(!rep) return Response.Json(null, Response.HTTP_BAD_REQUEST, 'Email tidak terdaftar', res)

        // verify password
        const verifyPass = bcrypt.compareSync(password, rep.password);
        if(!verifyPass) return Response.Json(null, Response.HTTP_BAD_REQUEST, 'Password Salah', res)

        // create access token & refresh token 
        const accessToken = generateToken(rep.id, process.env.JWT_ACCESS_TOKEN, '15s');
        // simpan refreshToken ke dalam database
        const refreshToken = generateToken(rep.id, process.env.JWT_REFRESH_TOKEN, '1d');

        await users.createUserToken(req.cookies['x-refresh-token'], {user_id: rep.id, refresh_token: refreshToken, ip:req.ip})

        // set res.cookies
        res.cookie('x-refresh-token', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV !== 'development' ? true : false
        });
        // response json
        Response.Json({
            id: rep.id,
            username: rep.username,
            email: rep.email,
            accessToken: accessToken
        }, Response.HTTP_OK, 'Berhasil Login', res)
    } catch (error) {
        throw new Error(error.message);
    }
})

export const signout = asyncHandler(async(req, res, next) => {
    try {
        const refreshToken = req.cookies['x-refresh-token']
        if(refreshToken === null || undefined) {
            res.status(403);
            next(Error('Token invalid'))
        }

        // check refresh token di !database ? retrun 204
        const user = await users.getToken(refreshToken);
        if(user === null || undefined) {
            res.status(403); 
            next(Error('Token invalid'))
        }

        res.clearCookie('x-refresh-token', {maxAge: 0, expires : new Date() })
        // jika ada update refresh token jadikan null
        await users.removeUserToken(refreshToken, null)

        Response.Json(null, Response.HTTP_OK, "Berhasil Logout", res)
    } catch (error) {
        res.status(403)
        next(error)
    }
})

export const refreshToken = asyncHandler(async(req, res, next) => {
    try {
        // cek !refreshtoken ? return 401 
        const refreshtoken = req.cookies['x-refresh-token']
        if(!refreshtoken) {
            res.status(406)
            next(Error('Token refresh invalid'))
        }

        // cek refreshtoken di !database ? return 403
        const user = await users.getToken(refreshtoken);
        if(!user) { 
            res.status(401) 
            next(Error('Token access invalid'))
        }
        // membuat accesstoken yg baru
        jwt.verify(refreshtoken, process.env.JWT_REFRESH_TOKEN, (err, decoded)=>{
            if(err) return res.status(403)

            const accessToken = generateToken(user.user_id, process.env.JWT_ACCESS_TOKEN, '15s')

            res.json({
                accessToken
            })
        })
        // return accesstoken 
    } catch (error) {
        throw new Error(error.message);
    }
})