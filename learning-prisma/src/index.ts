import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function createUser() {
const user = await client.user.findFirst({
    where : {
        id : 2 
    },
    // you can also use include as well as select to seelc a specific column 
    select :{
        username : true,
        firstName :true , 
        Todo : true ,
    },
    //@ts-ignore
    
})
console.log(user)
}

createUser()