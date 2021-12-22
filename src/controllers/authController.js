import asyncHandler from 'express-async-handler'
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";


export const signup = asyncHandler(async(req, res) => {
    try {
        const { ...data } = req.body;
        const salt = await bcrypt.genSalt(10);

        // check singup user exist ? return status 403

        // create new user store to database ? return status 201
    } catch (error) {
        throw new Error(error.message);
    }
})

export const signin = asyncHandler(async(req, res) => {
    try {
        const { username, password } = req.body;

        // check username exist

        // verify password

        // create access token & refresh token 

        // simpan refreshToken ke dalam database

        // set res.cookies
        res.cookie('x-refresh-token', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        // response json
    } catch (error) {
        throw new Error(error.message);
    }
})

export const signout = asyncHandler(async(req, res) => {
    try {
        const refreshToken = req.cookies.x-refresh-token;
        
        // check refresh token di !database ? retrun 204

        // jika ada update refresh token jadikan null
        res.clearCookie('x-refresh-token');
    } catch (error) {
        throw new Error(error.message);
    }
})

export const refreshToken = asyncHandler(async(req, res) => {
    try {
        const refreshToken = req.cookies.x-refresh-token;
        // cek !refreshtoken ? return 401 
        // cek refreshtoken di !database ? return 403
        // membuat accesstoken yg baru
        // return accesstoken 
    } catch (error) {
        throw new Error(error.message);
    }
})