"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autheticated = Autheticated;
function Autheticated(req, res, next) {
    const cookie = req.cookies;
    console.log(cookie);
    if (cookie === undefined) {
        res.status(500).json({
            "err": "You are not authtenticated"
        });
    }
    else {
        next();
    }
}
