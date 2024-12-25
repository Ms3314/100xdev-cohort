"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const express_1 = __importDefault(require("express"));
const pgClient = new pg_1.Client("postgresql://postgresdemo_owner:VMKGj2zyS1va@ep-raspy-mud-a1lyt9p9.ap-southeast-1.aws.neon.tech/postgresdemo?sslmode=require");
const app = (0, express_1.default)();
app.use(express_1.default.json());
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
app.post('/create-user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, address, number, rollno, email } = req.body;
    yield pgClient.connect();
    const checkexist = `SELECT id , email FROM users u WHERE u.email = $1 `;
    const Querypg = yield pgClient.query(checkexist, [email]);
    if (Querypg.rowCount !== 0) {
        // console.log("we have found that your user id exists");
        console.log(Querypg.rows[0].id, " this is the id "); // this is the id 
        const query = ``;
    }
    console.log(Querypg);
    // const query = `CREATE TABLE users (
    //     id SERIAL PRIMARY KEY,
    //     username VARCHAR(50) UNIQUE NOT NULL ,
    //     email VARCHAR(255) UNIQUE NOT NULL ,
    //     password VARCHAR(255) NOT NULL , 
    //     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
    // );`
}));
app.listen(3000, () => {
    console.log("App is running on localhost 3000");
});
