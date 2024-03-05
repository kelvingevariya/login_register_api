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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const Joi = __importStar(require("joi"));
function validator(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { error } = yield registerSchema.validate(req.body, { abortEarly: false });
        if (error) {
            res.status(400).json({ error: error.message.replace(/\"+/g, "") });
        }
        else {
            next();
        }
    });
}
exports.validator = validator;
const registerSchema = Joi.object({
    userName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(), // "error": "userName is not allowed to be empty"
    email: Joi.string().required()
        .email({ minDomainSegments: 2 }), //"error": "email is not allowed to be empty"
    userPass: Joi.string().required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    //    "error": "userPass is not allowed to be empty"
    //"error": "userPass with value a fails to match the required pattern: /^[a-zA-Z0-9]{3,30}$/"
    role: Joi.string()
});
