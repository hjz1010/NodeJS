const http    = require('http');
const express = require('express');
const dotenv  = require('dotenv')
const { createUser2, createPost2, readPost2 } = require('./app')

dotenv.config()

const { DataSource } = require('typeorm')
const myDataSource = new DataSource ({
    type    : process.env.TYPEORM_CONNECTION,
    host    : process.env.TYPEORM_HOST,
    port    : process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

myDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!')
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
 
const app = express()
app.use(express.json())

//Mission 6
const createUser = (req, res) => {
    const {name, email, password} = req.body.data

    const queryRes = myDataSource.query(`
        INSERT INTO users (name, email, password)
        VALUE (?, ?, ?)
    `, [name, email, password])
    queryRes.then(() => {
        res.status(200).json({message: "userCreated"})
    })
}

//Mission 7 -Create
const createPost = (req, res) => {
    const { title, content, userId } = req.body.data

    const queryRes = myDataSource.query(`
        INSERT INTO posts (title, content, user_id) 
        VALUE (?, ?, ?)
        `,[ title, content, userId ])
    queryRes.then(() => {
        res.status(200).json({message: "postCreated"})
    })
}

//Mission 7 -Read



app.post('/signup', createUser)
app.post('/posting', createPost)
app.get('/posting', readPost2)

const server = http.createServer(app)

server.listen(8000, () => { console.log('server is listening on PORT 8000')} )
