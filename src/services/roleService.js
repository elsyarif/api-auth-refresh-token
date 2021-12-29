import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient()

class roleService{

    async createRole(data){
        try {
            const role = await prisma.Roles.create({
                data: data
            })

            return role
        } catch (error) {
            throw new Error(error) 
        }
    }

    async getById(id){
        try {
            const role = await prisma.Roles.findUnique({
                where: {
                    id: id
                }
            })

            return role
        } catch (error) {
            throw new Error(error) 
        }
    }

    async updateRole(id, data){
        try {
            const role = await prisma.Roles.update({
                data : data,
                where: {
                    id:id
                }
            })
            return role
        } catch (error) {
            throw new Error(error) 
        }
    }

    async deleteRole(id){
        try {
            const role = await prisma.Roles.delete({
                where: {
                    id : id
                }
            })
            return role
        } catch (error) {
            throw new Error(error) 
        }
    }
}