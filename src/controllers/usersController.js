import asyncHandler from 'express-async-handler'
import Response from '../utils/response.js'
import Users from '../services/userService.js'

export const getProfile = asyncHandler(async(req, res, next) => {
    try {
        const id = req.user.id

        const user = await Users.get(id)

        Response.Json(user, Response.HTTP_OK, 'success', res)
    } catch (error) {
        throw new Error(error.message);
    }
})