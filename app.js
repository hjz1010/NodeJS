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


const createUser = (req, res) => {
    // const user = req.body.data  
    const { id, name, email, password } = req.body.data // 구조분해할당

    users.push({ id, name, email, password })

    console.log('users: ', users)

    res.status(200).json({message: 'userCreated'})
}

const createUser2 = (req, res) => {    // 조재준 멘토 버젼 +구조분해할당
		const { name, email, password} = req.body.data

        const lastUser = users[users.length -1]

        if (lastUser) {
            users.push({
                id: lastUser.id +1,
                name: name,
                email: email,
                password: password,
            })
        } else {
            users.push({
                id: 1,
                name: name,
                email: email,
                password: password,
            })
        }
        console.log('after!!!!!', users)
        res.status(200).json({message: 'userCreated'})
}

const createPost = (req, res) => {
    const { id, title, content, userId } = req.body.data
    
    posts.push({ id, title, content, userId })



    res.status(200).json({message: "postCreated"})
}

let postId = posts[posts.length -1].id +1    // 조재준 멘토 버젼 + 구조분해할당
const createPost2 = (req, res) => {
    const { id, title, content, userId } = req.body.data
    
    posts.push({ 
        id: postId++, 
        title: title, 
        content: content, 
        userId: userId
    })
    console.log('after!!!!!', posts)
    res.status(200).json({message: "postCreated"})
}

const readPost = (req, res) => {
    let data = []

    // for (let i = 0; i < posts.length; i++) {      // for (let i in posts) JS에서 for 반복문의 in은 딕셔너리의 키값을 가져온다.
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
        let user = users.find( (user) => {if (post.userId === user.id) return true} )
        console.log(user)
        if (! user) {
            return res.status(404).json({message: 'INVALID_USER'})
        }

        data.push ({
            userId : post.userId,
            userName : user.name,
            postingId : post.id,
            postingTitle : post.title,
            postingContent : post.content
        })
    } 
        
    res.status(200).json({data: data})
}

const readPost2 = (req, res) => {    // 조재준 멘토 버젼 
    let postsWithUserName = posts.map( (post)=> {
        let user = users.find( (user) => post.userId === user.id )  // if ..return true 불필요! 
        if (user) 
            return {
                ...post,           // post의 property들을 자동으로 풀어서 적어준다! key값을 그대로 사용할땐 요렇게!
                userName: user.name
            }
        else 
            return {
                ...post,        
                userName: null
            }
    })    

    res.status(200).json({data: postsWithUserName})
}

module.exports = { createUser, createPost, readPost, createUser2, createPost2, readPost2}