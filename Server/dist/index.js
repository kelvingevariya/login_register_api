"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const routeMain = require("./Routes/routes");
app.use(express.json());
app.use(cookieParser());
app.use("/", routeMain);
const srv = app.listen(process.env.PORT, () => {
    console.log(`Server Started on https://localhost:${process.env.PORT}`);
});
module.exports = srv;
