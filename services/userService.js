const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userDao = require('../models/userDao')

const createUser = async (name, email, password) => {
    const salt = bcrypt.genSaltSync(12)
    const hashedPassword = bcrypt.hashSync(password, salt)

    return await userDao.createUser(name, email, hashedPassword)

}

const login = async (email, password) => {

    const user = await userDao.login(email, password)

    if (!user) {
        // res.status(404).json({message: 'invalid user'})
        return 'invalid user';
    }

    const isPasswordCorrect =  bcrypt.compareSync(password, user.password) //true, false를 반환
        
    if (!isPasswordCorrect ) { 
        // res.status(400).json({message: 'login failed' })
        return 'login failed';
    }
    
    const token = jwt.sign({user_id: user.id}, 'secretKey')

    return token
    
}

module.exports = { createUser, login }