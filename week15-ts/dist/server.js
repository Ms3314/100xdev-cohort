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
const express_1 = __importDefault(require("express"));
const userSchema_1 = __importDefault(require("./models/userSchema"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
mongoose_1.default.connect("mongodb://localhost:27017/SecondBrain");
const app = (0, express_1.default)();
const PORT = 3000;
var Statuscode;
(function (Statuscode) {
    Statuscode[Statuscode["Signedup"] = 200] = "Signedup";
    Statuscode[Statuscode["Errorininputs"] = 411] = "Errorininputs";
    Statuscode[Statuscode["Useralready"] = 403] = "Useralready";
    Statuscode[Statuscode["Servererror"] = 500] = "Servererror";
})(Statuscode || (Statuscode = {}));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello world" });
});
let usernameRegex = /^[a-zA-Z]{3,10}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(.{8,})$/;
app.post('/api/v1/signup', (req, res) => {
    let { username, password } = req.body;
    const pass = "B4c0/\/";
    if (!usernameRegex.test(username)) {
        return res.status(Statuscode.Errorininputs).json("username should be 3-10 letters");
    }
    if (!passwordRegex.test(password)) {
        return res.status(Statuscode.Errorininputs).json("Think of a better password , this one is too ease");
    }
    var bcrypt = require('bcryptjs');
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(pass, salt, function (err, hash) {
            return __awaiter(this, void 0, void 0, function* () {
                // Store hash in your password DB.
                let foundemail = userSchema_1.default.findOne({
                    username
                });
                if (foundemail) {
                    return res.status(Statuscode.Useralready).json("User already exists");
                }
                const data = new userSchema_1.default({
                    username,
                    Password: hash,
                });
                const saved = yield userSchema_1.default.create(data);
                var token = jsonwebtoken_1.default.sign({ username: username }, 'shhhhh');
                return res.status(Statuscode.Signedup).json(token);
            });
        });
    });
});
app.post('/api/v1/login', (req, res) => {
    let { username, password } = req.body;
    let foundemail = userSchema_1.default.findOne({
        username
    });
    if (foundemail) {
        bcryptjs_1.default.compare("B4c0/\/", foundemail.Password, function (err, resp) {
            if (resp == password) {
                var token = jsonwebtoken_1.default.sign({ username: username }, 'shhhhh');
                return res.status(Statuscode.Signedup).json(token);
            }
            else {
                return res.status(Statuscode.Errorininputs).json(token);
            }
        });
    }
    else {
        return res.status(Statuscode.Errorininputs).json("invalid credetials");
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
