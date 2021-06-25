import express from "express"
import cors from "cors"
import bcrypt from "bcrypt"
import {v4 as uuidv4} from "uuid"
import dayjs from "dayjs"
import connection from "./database.js"
import {registerSchema, loginSchema, operationSchema} from "./schemas.js"

const app = express()
app.use(cors())
app.use(express.json())

app.post("/register", async (req,res)=>{
    try{
        const {name, email, password} = req.body

        if(registerSchema.validate(req.body).error){
            return res.sendStatus(400)
        }

        const query = await connection.query('SELECT * FROM clients WHERE email = $1', [email])
        if(query.rows.length){
            res.sendStatus(409)
            return
        }

        const hash = bcrypt.hashSync(password, 12)
        await connection.query(`
            INSERT INTO clients 
            (name, email, password) 
            VALUES ($1,$2,$3)`
        ,[name, email, hash])
        res.sendStatus(201)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

app.post("/login", async (req,res)=>{
    try{
        const {email, password} = req.body

        if(loginSchema.validate(req.body).error){
            return res.sendStatus(400)
        }

        const query = await connection.query(`
            SELECT * FROM clients 
            WHERE email = $1`
            , [email])

        if(query.rows.length && bcrypt.compareSync(password, query.rows[0].password )){
            const token = uuidv4()
            await connection.query(`
                INSERT INTO sessions 
                (token, "clientId") 
                VALUES ($1, $2) `
                ,[token, query.rows[0].clientId])
            res.send({name: query.rows[0].name, token: token}).status(200)
        }else{
            res.sendStatus(401)
        }
        
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

app.post("/registerOperation", async (req,res)=>{
    try{
        const {ammount, description, operation} = req.body
        const date = dayjs().format('YYYY-MM-DD')
        const token = req.headers.authorization

        if(operationSchema.validate(req.body).error){
            return res.sendStatus(400)
        }else if(!token){
            return res.sendStatus(401)
        }
        
        const authQuery = await connection.query(`
            SELECT clients."clientId" FROM sessions
            JOIN clients ON sessions."clientId" = clients."clientId"
            WHERE sessions.token = $1
        `,[token])

        if(authQuery.rows.length){
            await connection.query(`
                INSERT INTO operations
                ("clientId", operation, ammount, date, description)
                VALUES
                ($1,$2,$3,$4,$5)
            `, [authQuery.rows[0].clientId, operation, ammount, date, description ])
            res.sendStatus(200)
        }else{
            res.sendStatus(401)
        }

    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

app.get("/balance", async (req,res)=>{
    try{
        const token = req.headers.authorization
        
        if(!token){
            return res.sendStatus(401)
        }

        const authQuery = await connection.query(`
            SELECT clients."clientId" FROM sessions
            JOIN clients ON sessions."clientId" = clients."clientId"
            WHERE sessions.token = $1
        `,[token])
        if(authQuery.rows.length){
            const query = await connection.query(`
                SELECT o.id, o.operation, o.ammount, o.date, o.description FROM operations o
                WHERE "clientId" = $1
            `, [authQuery.rows[0].clientId])
            res.send(query.rows)
        }else{
            res.sendStatus(401)
        }
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

app.post("/logout", async (req,res)=>{
    try{
        const token = req.headers.authorization
        
        if (!token){
            res.sendStatus(400)
            return;
        }
        await connection.query(`DELETE FROM sessions WHERE token = $1`, [token])
        res.sendStatus(200)

    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

export default app;