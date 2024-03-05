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
var chaiHttp = require('chai-http');
var chai = require('chai');
var expect = chai.expect;
var srv = require("/home/admin3/Desktop/Daily Work/NodeFiles/Mocha and Chai/API_Testing/Server/dist/index.js");
chai.use(chaiHttp);
function registerUserAPI(user) {
    var rtn = chai.request(srv).post("/register").send(user);
    return rtn;
}
function loginUserAPI(user) {
    var rtn = chai.request(srv).post("/login").send(user);
    return rtn;
}
describe("Test cases for the APIs", function () {
    describe("Register User", function () {
        it("Status if the user already exists", function () { return __awaiter(void 0, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, registerUserAPI({
                            "userName": "abc",
                            "email": "111111@gmail.com",
                            "userPass": "Abc1234",
                            "role": "admin"
                        })];
                    case 1:
                        resp = _a.sent();
                        expect(resp.body.error).to.equal("User Already Exist");
                        expect(resp).to.have.status(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("If any field is empty for registe user", function () { return __awaiter(void 0, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, registerUserAPI({
                            "userName": "",
                            "email": "0987654321@gmail.com",
                            "userPass": "Abc1234",
                            "role": "admin"
                        })];
                    case 1:
                        resp = _a.sent();
                        expect(resp.body.error).to.equal("userName is not allowed to be empty");
                        expect(resp).to.have.status(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("If password fails to match regex", function () { return __awaiter(void 0, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, registerUserAPI({
                            "userName": "asas",
                            "email": "09651243sa2a1@gmail.com",
                            "userPass": "1",
                            "role": "admin"
                        })];
                    case 1:
                        resp = _a.sent();
                        expect(resp.body).to.have.property("error");
                        expect(resp).to.have.status(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("If email is invalid", function () { return __awaiter(void 0, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, registerUserAPI({
                            "userName": "ass",
                            "email": "0965432gmail.com",
                            "userPass": "as1213",
                            "role": "admin"
                        })];
                    case 1:
                        resp = _a.sent();
                        expect(resp.body.error).to.equal("email must be a valid email");
                        expect(resp).to.have.status(400);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    //!!!!!!!!!!!!!!!!  LOGIN    ///////////////////////////////////
    describe("Login user", function () {
        it("Status if user sucessfully login", function () { return __awaiter(void 0, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, loginUserAPI({
                            "loginEmail": "test123@mail.com",
                            "loginPassword": "1234"
                        })];
                    case 1:
                        resp = _a.sent();
                        expect(resp.body).to.have.property("token");
                        expect(resp).to.have.status(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Status if user user not exist", function () { return __awaiter(void 0, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, loginUserAPI({
                            "loginEmail": "test1@mail.com",
                            "loginPassword": "1234"
                        })];
                    case 1:
                        resp = _a.sent();
                        expect(resp.body.error).to.equal("User not found");
                        expect(resp).to.have.status(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Status if user password does not match", function () { return __awaiter(void 0, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, loginUserAPI({
                            "loginEmail": "test123@mail.com",
                            "loginPassword": "124"
                        })];
                    case 1:
                        resp = _a.sent();
                        expect(resp.body.error).to.equal("Password Not Matched");
                        expect(resp).to.have.status(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Status login and email both are not present", function () { return __awaiter(void 0, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, loginUserAPI({
                            "loginEmai": "test123@mail.com",
                            "loginPasswor": "1222"
                        })];
                    case 1:
                        resp = _a.sent();
                        expect(resp.body.error).to.equal("UserName and password are required");
                        expect(resp).to.have.status(400);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
