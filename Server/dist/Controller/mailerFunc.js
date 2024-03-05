"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer = require("nodemailer");
function sendMail(userName, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        //* Sending the email
        const transporter = nodemailer.createTransport({
            //@ts-ignore
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: "kelvin.zerotimesolutions@gmail.com",
                pass: `${process.env.MAIL_KEY}`,
            },
        });
        const info = yield transporter.sendMail({
            from: "kelvin <kelvin.zerotimesolutions@gmail.com>",
            to: email,
            subject: "Registered Successfully",
            text: "The mail for username and password",
            html: `<img src="https://picsum.photos/200">
        <body><h1>The details are</h1> <br>
               <h3>Username : ${userName}</h3> <br>
               <h3>Password : ${password}</h3>
               </body>`,
            // attachments: [{
            //     filename: "test.txt",
            //     path: "/home/admin3/Desktop/Daily Work/Authorization/Data/test.txt"
            // }]
        });
    });
}
exports.sendMail = sendMail;
