import { NextFunction, Response, Request } from "express";
import { registers } from "../Schema/user";

const jwt = require("jsonwebtoken")
const arr = require("../Controller/userData")

export async function adminLogged(req: Request, res: Response, next: NextFunction) {
    try {
        let allData = await registers.find({});


        jwt.verify(req.cookies.token, process.env.secret_key, (err, decoded) => {
            if (decoded.role === "admin") {
                res.status(200).json(allData)
            } else {
                res.status(401).json({ error: "Not Authorized person" })


            }
        })
    } catch (err) {
        res.status(401).json({ error: "Please Login" })
    }

}