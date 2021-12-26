import pkg from '@prisma/client';
import { uuid } from 'uuidv4';
const { PrismaClient } = pkg;
const prisma = new PrismaClient()

import moment from 'moment';
class userService{

    async find(params){}

    async get(email){
        try {
            const user = prisma.users.findUnique({
                where:{
                    email: email
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
                },
                select : {
                    id: true,email: true,username: true,isactive: true
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

    async createUserToken(id = "", data){
        try {
            const exist = await prisma.user_tokens.findFirst({ 
                where : { refresh_token : id === undefined ? null : id }
            })

            if(exist){
                return this.updateUserToken(id, data);
            }
            const create = await prisma.user_tokens.create({
                data: {
                    id: uuid(),
                    user_id: data.user_id,
                    refresh_token: data.refresh_token,
                    ip: data.ip,
                    create_at: new Date()
                },
            })

            return create
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateUserToken(id, data){
        try {
            const exist = await prisma.user_tokens.findFirst({ 
                where : { refresh_token : id}
            })

            if(!exist) throw new Error('invalid token')
            const update = await prisma.user_tokens.update({
                where: {
                    id : exist.id
                },
                data: {
                    refresh_token: data.refresh_token,
                    ip: data.ip,
                    update_at : new Date()
                },
            })

            return update
        } catch (error) {
            throw new Error(error)
        }
    }

    async removeUserToken(refresh_token, data){
        try {
            const exist = await prisma.user_tokens.findFirst({ 
                where : { refresh_token : refresh_token}
            })

            const token = await prisma.user_tokens.delete({
                where: {
                    id : exist.id
                }
            })

            return token
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
            const user = prisma.user_tokens.findFirst({
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