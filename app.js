// app.js

const users = [
    {
      id: 1,
      name: "Rebekah Johnson",
      email: "Glover12345@gmail.com",
      password: "123qwe",
    },
    {
      id: 2,
      name: "Fabian Predovic",
      email: "Connell29@gmail.com",
      password: "password",
    },
  ];
  
  const posts = [
    {
      id: 1,
      title: "간단한 HTTP API 개발 시작!",
      content: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
      userId: 1,
    },
    {
      id: 2,
      title: "HTTP의 특성",
      content: "Request/Response와 Stateless!!",
      userId: 1,
    },
  ];
  
  // 아래에 코드를 작성해 주세요.

const http = require('http');
const express = require('express');

const app = express()
app.use(express.json())

const createUser = (req, res) => {
    const user = req.body.data   // request body에서 data 라는 변수를 가져와서 변수 user에 담는다. 

    users.push({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
    })

    console.log('users: ', users)

    res.status(200).json({message: 'userCreated'})
}

const createPost = (req, res) => {
    const post = req.body.data
    
    posts.push({
        id: post.id,
        title: post.title,
        content: post.content,
        userId: post.user_id,
    })

    res.status(200).json({message: "postCreated"})
}

const readPost = (req, res) => {
    let data = []

    // for (let i = 0; i < posts.length; i++) {      // for (let i in posts) JS에서 for 반복문의 in은 딕셔너리의 키값을 가져오거나 어레이의 인덱스를 가져오는 듯하다
    //     data.push ({
    //         userID : posts[i].userId,
    //         userName : users[posts[i].userId-1].name,
    //         postingId : posts[i].id,
    //         postingTitle : posts[i].title,
    //         postingContent : posts[i].content
    //     })
    // } 

    for (let post of posts) {
        // let userName
        // for (let user of users) {
        //     console.log(user)
        //     if (post.userId == user.id) { userName = user.name}
        // }
        let user = users.find((e)=>{if (post.userId == e.id) return true})
        console.log(user)
        if (! user) {
            return res.status(404).json({message: 'INVALID_USER'})
        }
        
        data.push ({
            userID : post.userId,
            userName : user.name,
            postingId : post.id,
            postingTitle : post.title,
            postingContent : post.content
        })
    } 
        
    res.status(200).json({data: data})
}

app.post('/signup', createUser)
app.post('/posting', createPost)
app.get('/posting', readPost)

const server = http.createServer(app)

server.listen(8000, () => { console.log('server is listening on PORT 8000')} )
