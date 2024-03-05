"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var register = require("../Controller/userData");
var loginUser = require("../Controller/auth");
var arr = require("../Controller/userData");
var userLogged_1 = require("../Middleware/userLogged");
var validator_1 = require("../Middleware/validator");
var admin_1 = require("../Middleware/admin");
router.post("/register", validator_1.validator, function (req, res) {
    //* Fuction store data to register the user
    register.storeData(req, res);
});
router.post("/login", function (req, res) {
    loginUser.authUser(req, res);
});
router.get("/home", userLogged_1.userLogged, function (req, res) {
});
router.get("/users", admin_1.adminLogged, function (req, res) {
});
module.exports = router;
