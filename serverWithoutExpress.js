// const http = require('http')

// const server = http.createServer(
//     (req, res) => {
//         console.log('request recieved')

//         res.setHeader('Content-Type','application/json')
//         res.end(JSON.stringify({message: "Welcome my server!"}))
//     }
// )

// server.listen(8000,()=>{
//     console.log('server is running on PORT 8000')
// })


const http = require('http')
const { sendProducts } = require('./sendProducts')

const server = http.createServer(
    (req, res) => {
        const { url, method} = req

        res.setHeader('Content-Type','applicaiont/json')

        if (url === '/ping') {
            return res.end(JSON.stringify({message: '/ pong'}))   //여기는 왜 return 이 필요해진걸까, 
        }                                                   // 없으면 요청 한번은 정상 실행된 후 에러로 서버가 끊긴다..
        if (url === '/signup' && method === 'POST') return res.end(JSON.stringify({message: '회원가입 완료!'}))
                                                        // 조건문이 true 일 때 실행할 문장이 하나면 {} 생략할 수 있다!!
        if (url === '/login' && method === 'POST') return res.end(JSON.stringify({message: '로그인 성공!'}))
        if (url === '/product' && method === 'GET') return sendProducts(res)


        res.end(JSON.stringify({message: 'this response answers to every request'}))
        
    }
)

server.listen(8000, ()=>{console.log('server is listening on PORT 8000')})