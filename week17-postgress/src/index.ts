import { Client } from "pg";
import express from "express";
const pgClient = new Client("postgresql://postgresdemo_owner:VMKGj2zyS1va@ep-raspy-mud-a1lyt9p9.ap-southeast-1.aws.neon.tech/postgresdemo?sslmode=require")
const app = express();
app.use(express.json())
// function createEmployees

// async function main () {
//     await pgClient.connect();
//     let resempolyees = await pgClient.query(`CREATE TABLE employee(
//         id SERIAL PRIMARY KEY ,
//         name VARCHAR()
//     )`)
//     // async function messagesend(msg:string , condn : boolean) {
//     //     let response =await pgClient.query(` INSERT INTO todo (task , completed) VALUES ( ${msg} , ${condn}) `)
//     //     console.log(response)
//     // }   
//     // messagesend("hello guys we did it" , false)
// }


app.post('/create-user' , async (req , res) => {
    await pgClient.connect();
    

})

app.listen(3000 , () => {
    console.log("App is running on localhost 3000")
})