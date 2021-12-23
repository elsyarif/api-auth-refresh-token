import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient()

class userService{

    async get(id){
       try {
        const user = prisma.users.findUnique({
            where: {id:id}
        })

        return user
       } catch (error) {
          throw new Error(error) 
       }
    }
}

const Users = new userService()

export default Users