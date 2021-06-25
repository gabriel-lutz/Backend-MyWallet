import supertest from "supertest"
import app from "../src/app.js"
import connection from "../src/database.js"

let testToken;

beforeAll(async ()=>{
    try{
        await supertest(app).post("/register").send({
            name: "jest", 
            email: "jest@google.com", 
            password: "jest" 
        })
        const result = await supertest(app).post("/login").send({
            email: "jest@google.com",
            password: "jest"
        })
        testToken = result.body.token
    }catch(err){
        console.log(err)
    }
})

afterAll(async()=>{
    try{
        await supertest(app).post("/logout").set({
            "Authorization": testToken
        });
        await connection.query("DELETE FROM clients WHERE name = 'jest' ")
        connection.end();
    }catch(err){

    }
})

describe("POST /registerOperation",() => {
    it("return status 200 for valid params", async ()=>{
        const result  = await supertest(app).post("/registerOperation").send({
            ammount: 2000,
            description: "jest test",
            operation: "cashin"
        }).set(
                {"Authorization": testToken
            });
        expect(result.status).toEqual(200)
    })

    it("return status 400 for invalid ammount params", async ()=>{
        const result  = await supertest(app).post("/registerOperation").send({
            ammount: 0,
            description: "jest test",
            operation: "cashin"
        }).set(
                {"Authorization": testToken
            });
        expect(result.status).toEqual(400)
    })

    it("return status 400 for invalid description params", async ()=>{
        const result  = await supertest(app).post("/registerOperation").send({
            ammount: 100,
            description: "",
            operation: "cashin"
        }).set(
                {"Authorization": testToken
            });
        expect(result.status).toEqual(400)
    })

    it("return status 400 for invalid operation params", async ()=>{
        const result  = await supertest(app).post("/registerOperation").send({
            ammount: 100,
            description: "jest test",
            operation: ""
        }).set(
                {"Authorization": testToken
            });
        expect(result.status).toEqual(400)
    })

    it("return status 401 for invalid token", async ()=>{
        const result  = await supertest(app).post("/registerOperation").send({
            ammount: 100,
            description: "Jest test",
            operation: "cashin"
        }).set(
                {"Authorization": ""
            });
        expect(result.status).toEqual(401)
    })

})