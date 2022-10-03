const postDao = require('../models/postDao')

const createPost = async (title, content, userId) => {
    return await postDao.createPost(title, content, userId)
}

const readPost = async (user_id) => {
    if (user_id) {
        return await postDao.readPostByUserId(user_id)
    } else {
        return await postDao.readPostAll()
    }
}

const updatePost = async ( post_id, content ) => {
    return await postDao.updatePost( post_id, content )
}

const deletePost = async ( post_id ) => {
    return await postDao.deletePost(post_id)
}

module.exports = { createPost, readPost, updatePost, deletePost }