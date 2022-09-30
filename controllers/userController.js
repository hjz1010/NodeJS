
const userService = require('../services/userService')

const createUser = async (req, res) => {
    const {name, email, password} = req.body.data

    if (!name || !email || !password) {    
        res.status(400).json({message: '누락된 값이 있습니다'})
        return;   
    } 

    const result = await userService.createUser(name, email, password)

    if (result === 'duplicate email') {
        res.status(400).json({message: '이미 존재하는 이메일입니다.'})
        return;
    }
    
    res.status(200).json({message: 'userCreated'})
}

const login = async (req, res) => {
    const { email, password } = req.body.data

    if (!email || !password) {
        res.status(400).json({message: '아이디와 비밀번호를 모두 입력하세요.'})
        return;
    }

    const result = await userService.login(email,password)

    if (result === 'invalid user') {
        res.status(404).json({message: result})
        return;
    }

    if (result === 'login failed') {
        res.status(400).json({message: result })
        return;
    }

    res.status(200).json({message: 'login succeed', token: result })

}

module.exports = { createUser, login }