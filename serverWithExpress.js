const http = require('http')
const express = require('express')
const { sendProducts } = require('./sendProducts2')

const app = express()   //Express 모듈을 임포트 한 후 함수를 실행해서 app 이란 변수에 담는 것이 컨벤션
app.use(express.json())

app.get('/ping', (req, res) => {
    res.json({message: '/ pong'})   // 이제 res.end(JSON.stringify()) 대신 res.json()
})
app.post('/signup', (req,res)=> res.json({message: '회원가입 완료!'})) // 첫번째 인자는 endpoint
app.post('/login', (req,res) => res.json({message: '로그인 성공!'})) // 두번째 인자는 콜백함수 
app.get('/product', sendProducts)  // 콜백함수는 뒤에 () 없이

// 예외처리 'this response answers to every request' 는 어떻게하면 될까?

const server = http.createServer(app)

server.listen(8000, () => {
    console.log('server is listening on PORT 8000')
})