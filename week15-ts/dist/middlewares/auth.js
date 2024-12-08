"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autheticated = Autheticated;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function Autheticated(req, res, next) {
    const cookies = Object.keys(req.cookies)[0];
    console.log(cookies, "this is the token in the cookie");
    if (cookies === undefined) {
        res.status(500).json({
            "err": "You are not authtenticated"
        });
    }
    else {
        var decoded = jsonwebtoken_1.default.verify(cookies, 'shhhhh');
        console.log(decoded);
        req.user = decoded;
        next();
    }
}
