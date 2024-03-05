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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeData = exports.arrayOfUsers = void 0;
var mailModule = require("./mailerFunc");
var bcrypt = require("bcryptjs");
var Joi = require('joi');
var user_1 = require("../Schema/user");
var userDataJSON_json_1 = require("../../../Data/userDataJSON.json");
exports.arrayOfUsers = [];
exports.arrayOfUsers.push.apply(exports.arrayOfUsers, userDataJSON_json_1.default);
function storeData(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, username, email, userPass, role, mailQuery, userExists, password;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, username = _a.username, email = _a.email, userPass = _a.userPass, role = _a.role;
                    mailQuery = user_1.registers.findOne({ email: "".concat(email) }, { email: 1, _id: 0 });
                    return [4 /*yield*/, mailQuery.exec()];
                case 1:
                    userExists = _b.sent();
                    if (!userExists) return [3 /*break*/, 2];
                    res.status(400).json({ error: "User Already Exist" });
                    return [3 /*break*/, 5];
                case 2: return [4 /*yield*/, bcrypt.hash(userPass, 10)];
                case 3:
                    password = _b.sent();
                    //*Email 
                    // mailModule.sendMail(userName, email, userPass)
                    //* Adding the user to the file JSON or db 
                    return [4 /*yield*/, user_1.registers.insertMany({ username: username, email: email, password: password, role: role }).then(function () {
                            res.status(201).json({ status: "Data Stored" });
                        })
                        // arrayOfUsers.push({ userId: id, userName: userName, userPassword: passHashed, email: email, role: role })
                        // await fs.writeFile('../Data/userDataJSON.json', JSON.stringify(arrayOfUsers), (err, data) => {
                        //     res.status(201).json({ messege: `Stored` })
                        // })
                    ];
                case 4:
                    //*Email 
                    // mailModule.sendMail(userName, email, userPass)
                    //* Adding the user to the file JSON or db 
                    _b.sent();
                    _b.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.storeData = storeData;
module.exports = { storeData: storeData, arrayOfUsers: exports.arrayOfUsers };
