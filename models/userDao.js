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
 

const createUser = async (name, email, hashedPassword) => {

    // const [ isDuplicateEmail ] = await myDataSource.query(`
    // SELECT * FROM users WHERE email =?
    // `,[email])

    // if (isDuplicateEmail) {
    //     res.status(400).json({message: '이미 존재하는 이메일입니다.'})
    //     return;
    // }  
    // 왜 안될까, 이 파일에 위치하는건 맞나? 맞는것 같은데 response를 어떻게 구현해야 작동될까?
    // 이렇게 해볼까?
    const [ isDuplicateEmail ] = await myDataSource.query(`
    SELECT * FROM users WHERE email =?
    `,[email])

    if (isDuplicateEmail) {
        // return 'duplicate email';
        const error = new Error ('duplicate email')
        error.statusCode = 400
        throw error
    }  

    return await myDataSource.query(`
    INSERT INTO users (name, email, password)
    VALUE (?, ?, ?)
`, [name, email, hashedPassword])

}

// Dao에서 함수 이름은 "어떤 데이터를 어떻게 C.R.U.D하는 것인지-로 적어주는게 좋다!"
const getUserByEmail = async (email) => {
    const [user] = await myDataSource.query(`
    SELECT * FROM users WHERE email=?
    `,[email])

    return user
    
}

module.exports = { createUser, getUserByEmail }