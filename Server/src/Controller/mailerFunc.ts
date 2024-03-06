import * as nodemailer from "nodemailer";
import { env } from "process";


async function sendMail(userName, email, password) {
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

    const info = await transporter.sendMail({
        from: "kelvin <kelvin.zerotimesolutions@gmail.com>",
        to: email,
        subject: "Registered Successfully",
        text: "The mail for username and password",
        html: `<img src="https://picsum.photos/200">
        <body><h1>The details are</h1> <br>
               <h3>Username : ${userName}</h3> <br>
               <h3>Password : ${password}</h3>
               </body>`,
        attachments: [{
            filename: "test.txt",
            path: "/home/admin3/Desktop/Daily Work/NodeFiles/Authorization/Data/test.txt"
        }]
    }
    )




}

module.exports = { sendMail }