"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeData = exports.arrayOfUsers = void 0;
const fs = __importStar(require("fs"));
const mailerFunc_1 = require("./mailerFunc");
const bcrypt = __importStar(require("bcryptjs"));
const uuid_1 = require("uuid");
const userDataJSON_json_1 = __importDefault(require("../../../Data/userDataJSON.json"));
exports.arrayOfUsers = [];
exports.arrayOfUsers.push(...userDataJSON_json_1.default);
function storeData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userName, email, userPass, role } = req.body;
        //* If user is already present 
        const userExists = yield exports.arrayOfUsers.some((key) => key.email === email);
        if (userExists) {
            res.status(400).json({ error: "User Already Exist" });
        }
        else {
            //* Encrypt Password
            const passHashed = yield bcrypt.hash(userPass, 10);
            //* Id
            const id = (0, uuid_1.v4)();
            //*Email 
            (0, mailerFunc_1.sendMail)(userName, email, userPass);
            //* Adding the user to the file JSON
            exports.arrayOfUsers.push({ userId: id, userName: userName, userPassword: passHashed, email: email, role: role });
            yield fs.writeFile('../Data/userDataJSON.json', JSON.stringify(exports.arrayOfUsers), () => {
                res.status(201).json({ messege: `Stored` });
            });
        }
    });
}
exports.storeData = storeData;
