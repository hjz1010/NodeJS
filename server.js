
const http = require('http');
const express = require('express');
const { createUser2, createPost2, readPost2 } = require('./app')

const app = express()
app.use(express.json())

app.post('/signup', createUser2)
app.post('/posting', createPost2)
app.get('/posting', readPost2)

const server = http.createServer(app)

server.listen(8000, () => { console.log('server is listening on PORT 8000')} )
