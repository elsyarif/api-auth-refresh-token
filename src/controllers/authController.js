import asyncHandler from 'express-async-handler'
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

import authService from '../services/authServices.js'

export const signup = asyncHandler(async(req, res) => {
    try {
        const { ...data } = req.body;
        const salt = await bcrypt.genSalt(10);
        const user = new authService()

        // check singup user exist ? return status 403
        const exist = await user.get(data.email);
        if(exist) return res.status(403).json({
            statusCode : 403,
            message: "email sudah terdaftar"
        })
        
        const usercreate = await user.create({
            username: data.username,
            email: data.email,
            password: bcrypt.hashSync(data.password, salt),
        });

        if(usercreate){
            res.status(201).json({
                statusCode: 201,
                message:"berhasil register",
                data: usercreate
            })
        }
    } catch (error) {
        throw new Error(error.message);
    }
})

export const signin = asyncHandler(async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = new authService()
        // check username exist
        const rep = await user.get(email);
        if(!rep) return res.status(403).json({
            statusCode : 403,
            message: "email tidak terdaftar"
        })
        // verify password
        const verifyPass = bcrypt.compareSync(password, rep.password);
        if(!verifyPass) return res.status(403).json(
            {statusCode : 403,
            message: "password salah"
        })
        // create access token & refresh token 
        const accessToken = generateToken(rep.id, process.env.JWT_ACCESS_TOKEN, '15s');
        // simpan refreshToken ke dalam database
        const refreshToken = generateToken(rep.id, process.env.JWT_REFRESH_TOKEN, '15s');

        const updateToken = await user.updateToken(rep.id, refreshToken)

        // set res.cookies
        res.cookie('x-refresh-token', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            // secure: process.env.NODE_ENV === 'development' ? false : true
        });
        // response json
        res.status(200).json({
            statusCode: 200,
            message: "berhsil login",
            data: rep
        })
    } catch (error) {
        throw new Error(error.message);
    }
})

export const signout = asyncHandler(async(req, res) => {
    try {
        const refreshToken = req.cookies['x-refresh-token']
        
        // check refresh token di !database ? retrun 204

        // jika ada update refresh token jadikan null
        res.clearCookie('x-refresh-token');
    } catch (error) {
        throw new Error(error.message);
    }
})

export const refreshToken = asyncHandler(async(req, res) => {
    try {
        const refreshToken = req.cookies['x-refresh-token']
        // cek !refreshtoken ? return 401 
        // cek refreshtoken di !database ? return 403
        // membuat accesstoken yg baru
        // return accesstoken 
    } catch (error) {
        throw new Error(error.message);
    }
})