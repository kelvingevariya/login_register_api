import { error } from "console";

const chaiHttp = require('chai-http');
const chai = require('chai');
const expect = chai.expect;
const srv = require("/home/admin3/Desktop/Daily Work/NodeFiles/Mocha and Chai/API_Testing/Server/dist/index.js")
chai.use(chaiHttp);

function registerUserAPI(user: {}) {
    let rtn = chai.request(srv).post("/register").send(user)

    return rtn
}
function loginUserAPI(user: {}) {
    let rtn = chai.request(srv).post("/login").send(user)

    return rtn
}

describe("Test cases for the APIs", () => {


    describe("Register User", () => {

        it("Status if the user already exists", async () => {
            let resp = await registerUserAPI({
                "userName": "abc",
                "email": "111111@gmail.com",
                "userPass": "Abc1234",
                "role": "admin"
            }
            )
            expect(resp.body.error).to.equal("User Already Exist")
            expect(resp).to.have.status(400)
        })

        it("If any field is empty for registe user", async () => {
            let resp = await registerUserAPI({
                "userName": "",
                "email": "0987654321@gmail.com",
                "userPass": "Abc1234",
                "role": "admin"
            })

            expect(resp.body.error).to.equal("userName is not allowed to be empty")
            expect(resp).to.have.status(400)


        })
        it("If password fails to match regex", async () => {

            let resp = await registerUserAPI({
                "userName": "asas",
                "email": "09651243sa2a1@gmail.com",
                "userPass": "1",
                "role": "admin"
            });
            expect(resp.body).to.have.property("error")
            expect(resp).to.have.status(400)

        })
        it("If email is invalid", async () => {
            let resp = await registerUserAPI({
                "userName": "ass",
                "email": "0965432gmail.com",
                "userPass": "as1213",
                "role": "admin"
            });
            expect(resp.body.error).to.equal("email must be a valid email")
            expect(resp).to.have.status(400)

        })
    })

    //!!!!!!!!!!!!!!!!  LOGIN    ///////////////////////////////////

    describe("Login user", () => {
        it("Status if user sucessfully login", async () => {
            let resp = await loginUserAPI({
                "loginEmail": "test123@mail.com",
                "loginPassword": "1234"
            });
            expect(resp.body).to.have.property("token")
            expect(resp).to.have.status(200)

        })

        it("Status if user user not exist", async () => {
            let resp = await loginUserAPI({

                "loginEmail": "test1@mail.com",
                "loginPassword": "1234"

            });
            expect(resp.body.error).to.equal("User not found")
            expect(resp).to.have.status(400)

        })

        it("Status if user password does not match", async () => {
            let resp = await loginUserAPI({

                "loginEmail": "test123@mail.com",
                "loginPassword": "124"

            });
            expect(resp.body.error).to.equal("Password Not Matched")
            expect(resp).to.have.status(400)

        })
        it("Status login and email both are not present", async () => {
            let resp = await loginUserAPI({

                "loginEmai": "test123@mail.com",
                "loginPasswor": "1222"

            });
            expect(resp.body.error).to.equal("UserName and password are required")
            expect(resp).to.have.status(400)

        })

    })

})