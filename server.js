const http    = require('http');
const express = require('express');
const dotenv  = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

// const createUser = (req, res) => {
//     const {name, email, password} = req.body.data

//     const queryRes = myDataSource.query(`
//         INSERT INTO users (name, email, password)
//         VALUE (?, ?, ?)
//     `, [name, email, password])
//     queryRes
//         .then(() => {
//             res.status(200).json({message: "userCreated"})
//         })
//         .catch(()=>{
//             res.status(500).json({message: "error"})
//         })
// }

const createUser = async (req, res) => {
    const {name, email, password} = req.body.data

    // 예외핸들링도 해야지
    if (!name || !email || !password) {    
        res.status(400).json({message: '누락된 값이 있습니다'})
        return;   // 더 이상 코드가 진행되지 않도록 !!!!!
    } 

    console.log('before encrypted: ', password)
    // const salt = bcrypt.genSalt()
    const salt = bcrypt.genSaltSync(12)
    console.log('salt: ', salt)

    const hashedPassword = bcrypt.hashSync(password, salt)
    console.log('after encrypted: ', hashedPassword)

    try {
        await myDataSource.query(`
            INSERT INTO users (name, email, password)
            VALUE (?, ?, ?)
        `, [name, email, hashedPassword])
        
        res.status(200).json({message: 'userCreated'})
    } 
    catch (err) {
        console.log(err)
        res.status(500).json({message: 'error'})
    }

}

// LogIn 

app.post('/login', async (req, res) => {
    const { email, password } = req.body.data

    if (!email || !password) {
        res.status(400).json({message: '아이디와 비밀번호를 모두 입력하세요.'})
        return;
    }
    const [user] = await myDataSource.query(`
        SELECT * FROM users WHERE email=?
    `,[email])
    console.log(user)  // 배열
    if (!user) {
        res.status(404).json({message: 'invalid user'})
        return;
    }

    try {
        const isPasswordCorrect =  bcrypt.compareSync(password, user.password) //true, false를 반환
        
        if (!isPasswordCorrect ) { 
            res.status(400).json({message: 'login failed' })
            return;
        }
        
        const token = jwt.sign({user_id: user.id}, 'secretKey')
        res.status(200).json({message: 'login succeed', token: token })
       
    }
    catch (err) {
        console.log(err)
        res.status(500).json({message: 'error'})
    }
})

//Mission 7 -Create
const createPost = (req, res) => {
    const { title, content, userId } = req.body.data

    const queryRes = myDataSource.query(`
        INSERT INTO posts (title, content, user_id) 
        VALUE (?, ?, ?)
        `,[ title, content, userId ])
    queryRes
        .then(() => {
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

// Read2 멘토 코드 
const readPostsByUser2 = async (req, res, next) => {
    const { user_id } = req.params   // path parameter 받아오는 방법!
    const postings = await myDataSource.query(`
        SELECT
        users.id as user_id,
        users.name as user_name,
        JSON_ARRAYAGG(
            JSON_OBJECT(
            'post_id', posts.id,
            'title', posts.title,
            'content', posts.content
            )
        ) as postings
        FROM posts
        JOIN users ON users.id = posts.user_id
        WHERE users.id = ?
        GROUP BY users.id
    ;`,[user_id])
    res.status(200).json({data: postings})
}

//Mission 7 -Update
const updatePost = async (req, res) => {
    const { post_id, content } = req.body.data
    await myDataSource.query(`
        UPDATE posts
        SET content = ?
        WHERE id = ?
    `, [content, post_id])
    const newPost = await myDataSource.query(`
        SELECT 
            posts.id, 
            posts.title, 
            posts.content, 
            posts.user_id, 
            users.name as user_name
        FROM posts  
        JOIN users ON posts.user_id = users.id
        WHERE posts.id = ?
    `,[post_id])
    
    res.status(201).json({data: newPost})
} 

//Mission 7 -Delete
const deletePost = async (req, res) => {
    const { post_id } = req.params
    await myDataSource.query(`
        DELETE FROM posts
        WHERE id = ?
    `,[post_id])

    res.status(204).json({message: 'postingDeleted'})  //204로 응답을 보내면 바디(메세지)가 안 온다!
}

app.post('/signup', createUser)
app.post('/posting', createPost)
app.get('/posts', readPosts)
app.get('/posts/:user_id', readPostsByUser2)
app.patch('/posting/update', updatePost)
app.delete('/posting/delete/:post_id', deletePost)

const server = http.createServer(app)

server.listen(8000, () => { console.log('server is listening on PORT 8000')} )



// 세션: 에러 핸들링
// const { someFunc, someAsyncFunc } = require('./func');

// app.get('/someFunc', (req, res) => {
// 	const { someQuery } = req.query;

// 	const someValue = someFunc(someQuery);
// 	res.json({ result: someValue });
// });

// app.get('/someAsyncFunc', async (req, res) => {
// 	const { someQuery } = req.query;

// 	const someValue = await someAsyncFunc(someQuery);
// 	res.json({ result: someValue });
// });

