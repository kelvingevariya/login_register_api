"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogged = void 0;
const jwt = require("jsonwebtoken");
function userLogged(req, res, next) {
    jwt.verify(req.cookies.token, process.env.secret_key, (err, decoded) => {
        if (decoded) {
            res.status(200).json({ messege: `Welcome to the website ${decoded.userName}` });
        }
        else {
            res.status(401).json({ error: "please Login" });
        }
    });
}
exports.userLogged = userLogged;
