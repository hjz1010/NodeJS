const http    = require('http');
const express = require('express');
const dotenv  = require('dotenv')
// const { createUser2, createPost2, readPost2 } = require('./app')

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
const readPost = async (req, res) => {
    const posts = await myDataSource.query('SELECT * FROM posts')
    res.status(200).json({data: posts})
}
// 여기까진 성공 이제 userName도 같이 불러오자
const readPosts = async (req, res) => {
    const posts = await myDataSource.query(`
        SELECT 
            posts.id, 
            posts.title, 
            posts.content, 
            posts.user_id, 
            users.name as user_name
        FROM posts  
        JOIN users ON posts.user_id = users.id;
    `)
    res.status(200).json({data: posts})
}

//Mission 7 -Read2
const readPostsByUser = async (req, res, next) => {
    const { user_id } = req.params   // path parameter 받아오는 방법!
    const posts = await myDataSource.query(`
        SELECT 
            id as user_id ,
            name as user_name 
        FROM users
        WHERE id = ?
    `, [user_id])
    const postings = await myDataSource.query(`
        SELECT 
            id as post_id, 
            title, 
            content    
        FROM posts
        WHERE user_id = ?
    `,[user_id])
    posts[0]['postings'] = postings  // 따로 불러와서 합치기 
    res.status(200).json({data: posts})
}

app.post('/signup', createUser)
app.post('/posting', createPost)
app.get('/posts', readPosts)
app.get('/posts/:user_id', readPostsByUser)

const server = http.createServer(app)

server.listen(8000, () => { console.log('server is listening on PORT 8000')} )
