const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userDao = require('../models/userDao')

const createUser = async (name, email, password) => {
    const salt = bcrypt.genSaltSync(12)
    const hashedPassword = bcrypt.hashSync(password, salt)

    return await userDao.createUser(name, email, hashedPassword)

}

const login = async (email, password) => {
    const user = await userDao.getUserByEmail(email, password)

    if (!user) {
        // return 'invalid user';
        const error = new Error('login failed')
        error.statusCode = 404
        throw error
    }

    const isPasswordCorrect =  bcrypt.compareSync(password, user.password) //true, false를 반환
        
    if (!isPasswordCorrect ) { 
        // return 'login failed';
        const error = new Error('login failed')
        error.statusCode = 404
        throw error
    }
    
    const token = jwt.sign({user_id: user.id}, 'secretKey')

    return token
    
}

module.exports = { createUser, login }