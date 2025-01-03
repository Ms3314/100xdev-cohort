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
const contentSchema_1 = __importDefault(require("./models/contentSchema"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("./middlewares/auth");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const tagsSchema_1 = require("./models/tagsSchema");
const crypto_1 = require("crypto");
const linkSchema_1 = require("./models/linkSchema");
mongoose_1.default.connect("mongodb://localhost:27017/SecondBrain");
const app = (0, express_1.default)();
const PORT = 3000;
var Statuscode;
(function (Statuscode) {
    Statuscode[Statuscode["Signedup"] = 200] = "Signedup";
    Statuscode[Statuscode["Errorininputs"] = 411] = "Errorininputs";
    Statuscode[Statuscode["Useralready"] = 403] = "Useralready";
    Statuscode[Statuscode["Servererror"] = 500] = "Servererror";
    Statuscode[Statuscode["credentialsInvalid"] = 444] = "credentialsInvalid";
})(Statuscode || (Statuscode = {}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello world" });
});
let usernameRegex = /^[a-zA-Z]{3,10}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(.{8,})$/;
app.post('/api/v1/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, password } = req.body;
    console.log(req.body.username);
    // if(!passwordRegex.test(password))
    //     {
    //         return res.status(Statuscode.Errorininputs).json("Think of a better password , this one is too ease")        
    //     }
    bcryptjs_1.default.genSalt(10, function (err, salt) {
        return __awaiter(this, void 0, void 0, function* () {
            bcryptjs_1.default.hash(password, salt, function (err, hash) {
                return __awaiter(this, void 0, void 0, function* () {
                    // Store hash in your password DB.
                    console.log(hash, "hash kya mila");
                    let foundemail = yield userSchema_1.default.findOne({
                        username
                    });
                    console.log(foundemail, "ye found email ka type kya hai");
                    if (foundemail) {
                        return res.status(Statuscode.Useralready).json("User already exists");
                    }
                    const data = new userSchema_1.default({
                        username,
                        Password: hash,
                    });
                    const saved = yield userSchema_1.default.create(data);
                    var token = jsonwebtoken_1.default.sign({ username: username }, 'shhhhh');
                    res.cookie(token.toString(), "sami");
                    return res.status(Statuscode.Signedup).json(token);
                });
            });
        });
    });
}));
app.post('/api/v1/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, password } = req.body;
    let foundemail = yield userSchema_1.default.findOne({
        username: username
    });
    console.log(foundemail.Password, "this is the ID ");
    if (foundemail) {
        bcryptjs_1.default.compare(password, foundemail.Password, function (err, resp) {
            console.log(resp);
            if (resp === true) {
                var token = jsonwebtoken_1.default.sign({ username: username }, 'shhhhh');
                res.cookie(token.toString(), "sami");
                return res.status(Statuscode.Signedup).json(token);
            }
            else {
                return res.status(Statuscode.Errorininputs).json({
                    "msg": "invalid credentials"
                });
            }
        });
    }
    else {
        return res.status(Statuscode.Errorininputs).json("account does not exist make a new account ");
    }
}));
// this route will add u the content 
app.post('/api/v1/content', auth_1.Autheticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { type, link, title, tags } = req.body;
    let tagarr = [];
    let user = req.user;
    let i = 0;
    tags.map((tag) => __awaiter(void 0, void 0, void 0, function* () {
        let tagObtained = yield tagsSchema_1.Tags.findOne({ title: tag });
        if (tagObtained) {
            // console.log(tagObtained)
            tagarr.push(tagObtained._id);
            //console.log("Tag previously existed now added into the db")
        }
        else {
            const Tagss = new tagsSchema_1.Tags({
                title: tag
            });
            const Tagsfinal = yield tagsSchema_1.Tags.create(Tagss);
            // console.log(Tagsfinal , "this ones do not exist we are meking them ")
            tagarr.push(Tagsfinal._id);
            // console.log("Tag didnt exist now has been created")
        }
    }));
    // bhai yaha problem ye hai ki tags bhi aak tarah ka refrence hai ak nai tags ka schema banake usko link karna hai toh isliye tabtak ke liye isko rook dena hai 
    const declareduser = yield userSchema_1.default.findOne({ username: user.username });
    console.log(declareduser, "found the user");
    // console.log(user , "in the real root")
    const Contentdata = new contentSchema_1.default({
        link,
        title,
        type,
        tags: tagarr,
        //here is the only problem this thing accepts objectId as its input
        userId: declareduser._id
    });
    const savedContent = yield contentSchema_1.default.create(Contentdata);
    res.status(200).json(savedContent);
}));
//enabling of an sharable link , only the authenticated perosn can enable this thing 
app.post("/api/v1/brain/share", auth_1.Autheticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { share } = req.body;
    if (share === true) {
        // we get the username of the user now 
        let user = req.user;
        console.log(user, "user mil gaya");
        let Userfound = yield userSchema_1.default.findOne({ username: user.username });
        if (Userfound) {
            let LinkExists = yield linkSchema_1.Link.findOne({ userId: Userfound._id });
            if (LinkExists) {
                res.status(200).json({
                    "msg": "Link already exists",
                    "link": `localhost:3000/api/v1/brain/${LinkExists.hash}`
                });
            }
            else {
                const hash = (0, crypto_1.createHash)('sha256').update(user.username).digest('base64');
                const newLink = new linkSchema_1.Link({
                    hash,
                    userId: Userfound._id
                });
                yield linkSchema_1.Link.create(newLink);
                res.status(200).json({
                    "link": `localhost:3000/api/v1/brain/${hash}`
                });
            }
        }
    }
}));
// this is like the sharable link for the second brain of a particular user
app.get("/api/v1/brain/:link", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const linkhere = req.params.link;
    let linkExists = yield linkSchema_1.Link.findOne({ hash: linkhere });
    // initializing the content we are gonna add int eh fina content 
    let contentarr = [];
    // console.log(linkhere)
    // console.log(linkExists , "the link exists in the DB ")
    if (linkExists) {
        let Userfound = yield userSchema_1.default.findById(linkExists.userId);
        if (Userfound) {
            // finding all the content of a specific user 
            let Contentfound = yield contentSchema_1.default.find({ userId: Userfound._id }).populate({ path: "tags", select: ["title"] });
            Contentfound.map((item, index) => {
                let tagsarr = [];
                // console.log(item.tags)
                item.tags.map((x) => tagsarr.push(x.title));
                // [] here we are cooking the contents array by looping each of the content 
                let contents = {
                    "id": index + 1,
                    "type": item.type,
                    "link": item.link,
                    "title": item.title,
                    "tags": tagsarr,
                };
                contentarr.push(contents);
                // then we pushing each of the content here cuz we using content of one user only
            });
            // this our final object which we send to the client 
            let Contentfinal = {
                "username": Userfound.username,
                "contents": contentarr
            };
            res.status(200).json(Contentfinal);
        }
        else {
            res.status(444).json({ "err": "1 Some link problem " });
        }
    }
    else {
        res.status(444).json({ "err": "2 Some link problem " });
    }
}));
app.get("/donothing", auth_1.Autheticated, (req, res) => {
    console.log("yess ");
});
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
