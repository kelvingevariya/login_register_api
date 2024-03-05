

import { connectDB } from "./util/db";




require("dotenv").config()
const express = require("express");
const app = express();




const cookieParser = require('cookie-parser')
const routeMain = require("./Routes/routes")


app.use(express.json())
app.use(cookieParser())



app.use("/", routeMain)

connectDB().then(


    app.listen(process.env.PORT, () => {
        console.log(`Server Started on https://localhost:${process.env.PORT}`);

    })
)
export default { app };