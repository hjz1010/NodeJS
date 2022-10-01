const postService = require('../services/postService')

const createPost = async (req, res) => {
    const { title, content, userId } = req.body.data

    if (!userId) {
        res.status(400).json({message: 'no user id'})
        return;
    }
    if (!title || !content) {
        res.status(400).json({message: 'no title or content'})
        return;
    }

    await postService.createPost(title, content, userId)

    res.status(200).json({message: "postCreated"})
}

const readPost = async (req, res) => {
    const { user_id } = req.query  
    console.log('user_id: ', user_id)
    const posts = await postService.readPost(user_id)

    res.status(200).json({data: posts})
}

const updatePost = async (req, res) => {
    const { post_id, content } = req.body.data

    const newPost = await postService.updatePost( post_id, content )

    res.status(201).json({data: newPost})
}

const deletePost = async (req, res) => {
    const { post_id } = req.params

    await postService.deletePost(post_id)

    res.status(204).json({message: 'postingDeleted'})
}

module.exports = { createPost, readPost, updatePost, deletePost }