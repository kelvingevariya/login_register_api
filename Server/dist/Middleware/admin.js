"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogged = void 0;
const jwt = require("jsonwebtoken");
const arr = require("../Controller/userData");
function adminLogged(req, res, next) {
    try {
        jwt.verify(req.cookies.token, process.env.secret_key, (err, decoded) => {
            if (decoded.role === "admin") {
                res.status(200).json(arr.arrayOfUsers);
            }
            else {
                res.status(401).json({ error: "Not Authorized person" });
                console.log(decoded);
            }
        });
    }
    catch (err) {
        res.status(401).json({ error: "Please Login" });
    }
}
exports.adminLogged = adminLogged;
