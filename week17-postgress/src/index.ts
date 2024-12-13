import { Client } from "pg";

const pgClient = new Client("postgresql://postgresdemo_owner:VMKGj2zyS1va@ep-raspy-mud-a1lyt9p9.ap-southeast-1.aws.neon.tech/postgresdemo?sslmode=require")


async function main () {
    await pgClient.connect();
    let response = await pgClient.query(`INSERT INTO todo (task , completed) VALUES ('sdsdsdsds' , false)`); 
    console.log(response)
    // async function messagesend(msg:string , condn : boolean) {
    //     let response =await pgClient.query(` INSERT INTO todo (task , completed) VALUES ( ${msg} , ${condn}) `)
    //     console.log(response)
    // }   
    // messagesend("hello guys we did it" , false)
}



main()