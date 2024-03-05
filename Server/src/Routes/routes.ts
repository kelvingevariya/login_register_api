const express = require('express')
const router = express.Router()

const register = require("../Controller/userData")
const loginUser = require("../Controller/auth")
const arr = require("../Controller/userData")
import { Request, Response } from "express"
import { userLogged } from "../Middleware/userLogged"
import { validator } from "../Middleware/validator"
import { adminLogged } from "../Middleware/admin"


router.post("/register", validator, (req: Request, res: Response) => {
    //* Fuction store data to register the user
    register.storeData(req, res)

})


router.post("/login", (req: Request, res: Response) => {
    loginUser.authUser(req, res);
})



router.get("/home", userLogged, (req: Request, res: Response) => {

})
router.get("/users", adminLogged, (req: Request, res: Response) => {

})

module.exports = router