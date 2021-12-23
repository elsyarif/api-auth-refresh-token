import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient()
import bcryptjs from "bcryptjs"

class userService{

    async find(params){}

    async get(id){
        try {
            const user = prisma.users.findUnique({
                where:{
                    email: id
                }
            })
            return user
        } catch (error) {
            return error
        }
    }

    async getByID(id){
        try {
            const user = prisma.users.findUnique({
                where:{
                    id: id
                }
            })
            return user
        } catch (error) {
            return error
        }
    }

    async create(data){
        try {
            const user = await prisma.users.create({
                data: data
            })

            return user
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateToken(id, data){
        try {
            const update = await prisma.users.update({
                where: {
                    id: id
                },
                data: {
                    refresh_token: data
                },
            })

            return update
        } catch (error) {
            throw new Error(error)
        }
    }

    async patch(id, data, params){}
    
    async remove(id){
        try {
            const user = await prisma.users.remove({
                where: {
                    id: id
                }
            })

            return user
        } catch (error) {
            throw new Error(error)
        }
    }

    async getToken(token){
        try {
            const user = prisma.users.findUnique({
                where:{
                    refresh_token: token
                }
            })
            return user
        } catch (error) {
            throw new Error(error)
        }
    }
}

export default userService