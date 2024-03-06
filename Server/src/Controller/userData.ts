
const mailModule = require("./mailerFunc")
const bcrypt = require("bcryptjs");
const Joi = require('joi');


import { registers } from "../Schema/user";
import { v4 as uuidv4 } from 'uuid';
import userDataJSON from "../../../Data/userDataJSON.json"

import { NextFunction, Request, Response } from "express";

interface userData { userId?: string, userName?: string, userPassword?: string, email?: string, token?: string, role?: string }

export let arrayOfUsers: userData[] = []
arrayOfUsers.push(...userDataJSON)





export async function storeData(req: Request, res: Response) {

    const { username, email, userPass, role } = req.body


    //* If user is already present 
    // const userExists = await arrayOfUsers.some((key) => key.email === email)
    const userExists = await registers.findOne({ email: email }, { email: 1, _id: 0 });


    if (userExists) {
        res.status(400).json({ error: `User Already Exist` })

    } else {
        //* Encrypt Password
        const password = await bcrypt.hash(userPass, 10);
        //*Email 
        // mailModule.sendMail(userName, email, userPass)
        //* Adding the user to the file JSON or db 
        await registers.insertMany({ username, email, password, role }).then(() => {
            res.status(201).json({ status: `Data Stored` })

        })

        // arrayOfUsers.push({ userId: id, userName: userName, userPassword: passHashed, email: email, role: role })
        // await fs.writeFile('../Data/userDataJSON.json', JSON.stringify(arrayOfUsers), (err, data) => {
        //     res.status(201).json({ messege: `Stored` })
        // })
    }

}








module.exports = { storeData, arrayOfUsers };


