"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = void 0;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const arr = require("./userData");
function authUser(req, res) {
    let loginEmail = req.body.loginEmail;
    let loginPassword = req.body.loginPassword;
    if (!(loginEmail && loginPassword)) {
        res.status(400).send({ error: "UserName and password are required" });
    }
    else {
        let userFound = false;
        arr.arrayOfUsers.forEach((user) => {
            try {
                if (loginEmail === user.email) {
                    userFound = true;
                    const isPassSame = bcrypt.compareSync(loginPassword, user.userPassword);
                    if (!isPassSame) {
                        res.status(404).json({ error: "Password Not Matched" });
                    }
                    else {
                        const token = jwt.sign({ userName: user.userName, userEmail: loginEmail, role: user.role }, process.env.secret_key, { expiresIn: "2h" });
                        const cookieOption = {
                            expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
                            httpOnly: true
                        };
                        res.status(200).cookie("token", token, cookieOption).json({ userId: user.userId, token: token, role: user.role });
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
        });
        if (!userFound) {
            res.status(400).send({ error: "User not found" });
        }
    }
}
exports.authUser = authUser;
module.exports = { authUser };
