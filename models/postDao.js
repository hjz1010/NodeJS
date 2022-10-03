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

const createPost = async (title, content, userId) => {
    const queryRes = await myDataSource.query(`
            INSERT INTO posts (title, content, user_id) 
            VALUE (?, ?, ?)
            `,[ title, content, userId ])
    return queryRes;
}

const readPostByUserId = async (user_id) => {
    const posts = await myDataSource.query(`
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

    return posts;
}
const readPostAll = async () => {
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
    
    return posts
}
// update 기능만 갖도록 수정해보자 -> 정답은 없고 기업에 따라 모으기도, 나누기도 한다 ###########
const updatePost = async ( post_id, content ) => {
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

    return newPost
}

const deletePost = async (post_id) => {
    return await myDataSource.query(`
        DELETE FROM posts
        WHERE id = ?
    `,[post_id])
}

module.exports = { createPost, readPostByUserId, readPostAll, updatePost, deletePost }