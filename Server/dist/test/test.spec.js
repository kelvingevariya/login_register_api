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
const chaiHttp = require('chai-http');
const chai = require('chai');
const expect = chai.expect;
const srv = require("/home/admin3/Desktop/Daily Work/NodeFiles/Mocha and Chai/API_Testing/Server/dist/index.js");
chai.use(chaiHttp);
function registerUserAPI(user) {
    let rtn = chai.request(srv).post("/register").send(user);
    return rtn;
}
function loginUserAPI(user) {
    let rtn = chai.request(srv).post("/login").send(user);
    return rtn;
}
describe("Test cases for the APIs", () => {
    describe("Register User", () => {
        it("Status if the user already exists", () => __awaiter(void 0, void 0, void 0, function* () {
            let resp = yield registerUserAPI({
                "userName": "abc",
                "email": "111111@gmail.com",
                "userPass": "Abc1234",
                "role": "admin"
            });
            expect(resp.body.error).to.equal("User Already Exist");
            expect(resp).to.have.status(400);
        }));
        it("If any field is empty for registe user", () => __awaiter(void 0, void 0, void 0, function* () {
            let resp = yield registerUserAPI({
                "userName": "",
                "email": "0987654321@gmail.com",
                "userPass": "Abc1234",
                "role": "admin"
            });
            expect(resp.body.error).to.equal("userName is not allowed to be empty");
            expect(resp).to.have.status(400);
        }));
        it("If password fails to match regex", () => __awaiter(void 0, void 0, void 0, function* () {
            let resp = yield registerUserAPI({
                "userName": "asas",
                "email": "09651243sa2a1@gmail.com",
                "userPass": "1",
                "role": "admin"
            });
            expect(resp.body).to.have.property("error");
            expect(resp).to.have.status(400);
        }));
        it("If email is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
            let resp = yield registerUserAPI({
                "userName": "ass",
                "email": "0965432gmail.com",
                "userPass": "as1213",
                "role": "admin"
            });
            expect(resp.body.error).to.equal("email must be a valid email");
            expect(resp).to.have.status(400);
        }));
    });
    //!!!!!!!!!!!!!!!!  LOGIN    ///////////////////////////////////
    describe("Login user", () => {
        it("Status if user sucessfully login", () => __awaiter(void 0, void 0, void 0, function* () {
            let resp = yield loginUserAPI({
                "loginEmail": "test123@mail.com",
                "loginPassword": "1234"
            });
            expect(resp.body).to.have.property("token");
            expect(resp).to.have.status(200);
        }));
        it("Status if user user not exist", () => __awaiter(void 0, void 0, void 0, function* () {
            let resp = yield loginUserAPI({
                "loginEmail": "test1@mail.com",
                "loginPassword": "1234"
            });
            expect(resp.body.error).to.equal("User not found");
            expect(resp).to.have.status(400);
        }));
        it("Status if user password does not match", () => __awaiter(void 0, void 0, void 0, function* () {
            let resp = yield loginUserAPI({
                "loginEmail": "test123@mail.com",
                "loginPassword": "124"
            });
            expect(resp.body.error).to.equal("Password Not Matched");
            expect(resp).to.have.status(400);
        }));
        it("Status login and email both are not present", () => __awaiter(void 0, void 0, void 0, function* () {
            let resp = yield loginUserAPI({
                "loginEmai": "test123@mail.com",
                "loginPasswor": "1222"
            });
            expect(resp.body.error).to.equal("UserName and password are required");
            expect(resp).to.have.status(400);
        }));
    });
});
