import { NextFunction, Response, Request } from "express";

const jwt = require("jsonwebtoken")

export function userLogged(req: Request, res: Response, next: NextFunction) {
    jwt.verify(req.cookies.token, process.env.secret_key, (err, decoded) => {
        if (decoded) {
            res.status(200).json({ messege: `Welcome to the website ${decoded.username}` })
        } else {
            res.status(401).json({ error: "please Login" })

        }
    })
}
