import { NextFunction, Request, Response } from "express";
import { registers } from "../Schema/user";




const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const arr = require("./userData")



export async function authUser(req: Request, res: Response) {
    let loginEmail = req.body.loginEmail
    let loginPassword = req.body.loginPassword

    if (!(loginEmail && loginPassword)) {
        res.status(400).json({ error: "UserName and password are required" })
    } else {
        /*  arr.arrayOfUsers.forEach((user) => {
              try {
                  if (loginEmail === user.email) {
                      const isPassSame = bcrypt.compareSync(loginPassword, user.userPassword)
                      if (!isPassSame) {
                          res.status(404).json({ error: "Password Not Matched" })
                      } else {
                          const token = jwt.sign({ userName: user.userName, userEmail: loginEmail, role: user.role }, process.env.secret_key, { expiresIn: "2h" })
                          const cookieOption = {
                              expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
                              httpOnly: true
                          }
                          res.status(200).cookie("token", token, cookieOption).json({ userId: user.userId, token: token, role: user.role })
                      }
  
                  }
              }
              catch (err) {
                  console.log(err);
  
              }
  
          })*/

        try {
            const userExists = await registers.findOne({ email: loginEmail });


            console.log(userExists);

            if (userExists) {

                const isPassSame = await bcrypt.compare(loginPassword, userExists.password)
                if (!isPassSame) {
                    res.status(404).json({ error: "Password Not Matched" })
                } else {
                    const token = jwt.sign({ username: userExists.username, email: userExists.email, role: userExists.role }, process.env.secret_key, { expiresIn: "2h" })
                    const cookieOption = {
                        expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
                        httpOnly: true
                    }
                    res.status(200).cookie("token", token, cookieOption).json({ userId: userExists._id, token: token, role: userExists.role })
                }
            } else {
                res.status(404).json({ error: "User not found please register" })
            }


        } catch (error) {
            console.log(error);

        }

    }







}

module.exports = { authUser }