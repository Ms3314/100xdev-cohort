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
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pgClient = new pg_1.Client("postgresql://postgresdemo_owner:VMKGj2zyS1va@ep-raspy-mud-a1lyt9p9.ap-southeast-1.aws.neon.tech/postgresdemo?sslmode=require");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield pgClient.connect();
        let response = yield pgClient.query(`INSERT INTO todo (task , completed) VALUES ('sdsdsdsds' , false)`);
        console.log(response);
        // async function messagesend(msg:string , condn : boolean) {
        //     let response =await pgClient.query(` INSERT INTO todo (task , completed) VALUES ( ${msg} , ${condn}) `)
        //     console.log(response)
        // }   
        // messagesend("hello guys we did it" , false)
    });
}
main();
